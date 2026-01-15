// src/shared/components/common/RelationManager.tsx
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Button from "@/shared/components/common/Button";
import Alert from "@/shared/components/common/Alert";
import { useAlert } from "@/shared/hooks/useAlert";

// TYPES
interface BaseItem {
  id: number;
  [key: string]: any;
}

interface RelationManagerProps<
  TItem extends BaseItem,
  TAllItem extends BaseItem
> {
  // Títulos y labels
  title: string;
  parentLabel?: string;
  childLabel: string;

  // Datos
  currentItems: TItem[];
  allItems?: TAllItem[];

  // Operaciones (devuelven Promise)
  onAdd: (itemId: number) => Promise<void>;
  onRemove: (itemId: number) => Promise<void>;

  // Callbacks
  onClose: () => void;
  onUpdate: () => void;

  // Renderizado personalizado
  renderItem: (item: TAllItem) => string;
  renderCurrentItem?: (item: TItem) => React.ReactNode;
  renderTag?: (item: TItem) => React.ReactNode;

  // Opcionales
  loadAllItems?: () => Promise<TAllItem[]>;
  emptyCurrentMessage?: string;
  emptyAvailableMessage?: string;
  addButtonText?: string;
  closeButtonText?: string;
  removeButtonText?: string;
}

/**
 * Componente genérico para gestionar relaciones Many-to-Many
 *
 * @example
 * // Organismo → Fuentes
 * <RelationManager
 *   title="Gestionar Fuentes del Organismo"
 *   childLabel="Fuentes"
 *   currentItems={organismo.fuentes}
 *   renderItem={(f) => `Código ${f.codigo} - ${f.description}`}
 *   onAdd={(id) => OrganismoService.addFuenteToOrganismo(organismoId, id)}
 *   onRemove={(id) => OrganismoService.removeFuenteFromOrganismo(organismoId, id)}
 *   loadAllItems={async () => {
 *     const data = await FuenteService.listAll(100, 0);
 *     return data.results;
 *   }}
 *   onClose={() => setShowModal(false)}
 *   onUpdate={() => refetch()}
 * />
 */
export default function RelationManager<
  TItem extends BaseItem,
  TAllItem extends BaseItem = TItem
>({
  title,
  parentLabel,
  childLabel,
  currentItems,
  allItems: initialAllItems = [],
  onAdd,
  onRemove,
  onClose,
  onUpdate,
  renderItem,
  renderCurrentItem,
  renderTag,
  loadAllItems,
  emptyCurrentMessage = `No hay ${childLabel.toLowerCase()} asignados`,
  emptyAvailableMessage = `No hay más ${childLabel.toLowerCase()} disponibles`,
  addButtonText = "Agregar",
  closeButtonText = "Cerrar",
  removeButtonText = "Quitar",
}: RelationManagerProps<TItem, TAllItem>) {
  const [allItems, setAllItems] = useState<TAllItem[]>(initialAllItems);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    isOpen,
    alertConfig,
    showAlert,
    hideAlert,
    onConfirmCallback,
    onCancelCallback,
  } = useAlert();

  // ✅ Cargar items si se provee loadAllItems
  useEffect(() => {
    if (loadAllItems) {
      setLoading(true);
      loadAllItems()
        .then((items) => setAllItems(items))
        .catch((error) => {
          showAlert({
            type: "error",
            title: `Error al cargar ${childLabel.toLowerCase()}`,
            message: error.message || "No se pudieron cargar los datos",
            confirmText: "Aceptar",
          });
        })
        .finally(() => setLoading(false));
    }
  }, [loadAllItems, childLabel, showAlert]);

  // ✅ Calcular items disponibles (no están en currentItems)
  const availableItems = useMemo(() => {
    return allItems.filter(
      (item) => !currentItems.some((current) => current.id === item.id)
    );
  }, [allItems, currentItems]);

  // ✅ Agregar item
  const handleAdd = useCallback(async () => {
    if (!selectedItemId) return;

    setSubmitting(true);
    try {
      await onAdd(selectedItemId);
      setSelectedItemId(null);
      onUpdate();
      showAlert({
        type: "success",
        title: `${childLabel} agregado`,
        message: `El ${childLabel.toLowerCase()} se agregó exitosamente`,
      });
      setTimeout(() => hideAlert(), 2000);
    } catch (error: any) {
      showAlert({
        type: "error",
        title: `Error al agregar ${childLabel.toLowerCase()}`,
        message:
          error.message || `No se pudo agregar el ${childLabel.toLowerCase()}`,
        confirmText: "Aceptar",
      });
    } finally {
      setSubmitting(false);
    }
  }, [selectedItemId, onAdd, onUpdate, childLabel, showAlert, hideAlert]);

  // ✅ Confirmar y remover item
  const handleRemove = useCallback(
    (item: TItem) => {
      const itemLabel = renderItem ? renderItem(item as any) : `ID: ${item.id}`;

      showAlert(
        {
          type: "warning",
          title: `${removeButtonText} ${childLabel.toLowerCase()}`,
          message: `¿Deseas quitar "${itemLabel}"?`,
          confirmText: removeButtonText,
          cancelText: "Cancelar",
        },
        async () => {
          setSubmitting(true);
          try {
            await onRemove(item.id);
            onUpdate();
            showAlert({
              type: "success",
              title: `${childLabel} eliminado`,
              message: `El ${childLabel.toLowerCase()} se quitó exitosamente`,
            });
            setTimeout(() => hideAlert(), 2000);
          } catch (error: any) {
            showAlert({
              type: "error",
              title: `Error al eliminar ${childLabel.toLowerCase()}`,
              message:
                error.message ||
                `No se pudo quitar el ${childLabel.toLowerCase()}`,
              confirmText: "Aceptar",
            });
          } finally {
            setSubmitting(false);
          }
        }
      );
    },
    [
      onRemove,
      onUpdate,
      childLabel,
      removeButtonText,
      renderItem,
      showAlert,
      hideAlert,
    ]
  );

  // ✅ Renderizar item actual (por defecto usa renderItem)
  const renderCurrentItemContent = useCallback(
    (item: TItem) => {
      if (renderCurrentItem) {
        return renderCurrentItem(item);
      }
      return (
        <span className="text-sm">
          {renderItem ? renderItem(item as any) : `ID: ${item.id}`}
        </span>
      );
    },
    [renderCurrentItem, renderItem]
  );

  return (
    <>
      {/* Modal */}
      <div className="fixed inset-0 z-40 flex items-center justify-center">
        {/* Overlay */}
        <div className="fixed inset-0 bg-gray-900/30" onClick={onClose} />

        {/* Modal Content */}
        <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto z-50">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Cerrar modal"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {/* Items actuales */}
            <div>
              <h3 className="font-medium mb-3">
                {childLabel} actuales ({currentItems.length})
              </h3>

              {currentItems.length === 0 ? (
                <p className="text-sm text-gray-500 italic">
                  {emptyCurrentMessage}
                </p>
              ) : (
                <div className="space-y-2">
                  {currentItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
                    >
                      {renderCurrentItemContent(item)}

                      <Button
                        variant="ghost"
                        size="sm"
                        loading={submitting}
                        onClick={() => handleRemove(item)}
                        icon={TrashIcon}
                        className="text-red-600 hover:text-red-700"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Agregar item */}
            <div>
              <h3 className="font-medium mb-3">
                Agregar {childLabel.toLowerCase()}
              </h3>

              {loading ? (
                <p className="text-sm text-gray-500 italic">
                  Cargando {childLabel.toLowerCase()} disponibles...
                </p>
              ) : availableItems.length === 0 ? (
                <p className="text-sm text-gray-500 italic">
                  {emptyAvailableMessage}
                </p>
              ) : (
                <div className="flex gap-3">
                  <select
                    value={selectedItemId || ""}
                    onChange={(e) => setSelectedItemId(Number(e.target.value))}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-600 transition-colors"
                    disabled={submitting}
                  >
                    <option value="">
                      Seleccionar {childLabel.toLowerCase()}...
                    </option>
                    {availableItems.map((item) => (
                      <option key={item.id} value={item.id}>
                        {renderItem(item)}
                      </option>
                    ))}
                  </select>

                  <Button
                    variant="primary"
                    onClick={handleAdd}
                    loading={submitting}
                    disabled={!selectedItemId}
                  >
                    {addButtonText}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex justify-end">
            <Button variant="secondary" onClick={onClose} disabled={submitting}>
              {closeButtonText}
            </Button>
          </div>
        </div>
      </div>

      {/* Alert */}
      <Alert
        type={alertConfig.type}
        title={alertConfig.title}
        message={alertConfig.message}
        isOpen={isOpen}
        onClose={hideAlert}
        confirmText={alertConfig.confirmText}
        cancelText={alertConfig.cancelText}
        onConfirm={onConfirmCallback}
        onCancel={onCancelCallback}
      />
    </>
  );
}
