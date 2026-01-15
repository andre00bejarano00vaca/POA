"use client";

import React, { useState, useMemo, useCallback } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { DynamicTable, ColumnConfig } from "./DynamicTable";
import { DynamicForm, FieldConfig } from "./DynamicForm";
import Modal from "./Modal";
import SearchBar from "./SearchBar";
import ActionButtons from "./ActionButtons";
import Alert from "./Alert";
import Button from "./Button";
import Pagination from "./Pagination";
import { useAlert } from "@/shared/hooks/useAlert";

interface GenericListProps<T> {
  title: string;
  icon?: string | React.ReactNode;
  useData: () => {
    items: T[];
    loading: boolean;
    error: string | null;
    createItem: (data: any) => Promise<T>;
    updateItem?: (id: number, data: any) => Promise<T>;
    deleteItem?: (id: number) => Promise<void>;
    getItemById?: (id: number) => Promise<T | undefined>;

    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
    setItemsPerPage: (items: number) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
  };
  columns: ColumnConfig<T>[];
  formFields: FieldConfig<any>[];
  searchKeys: (keyof T)[];
  searchPlaceholder?: string;
  idKey?: keyof T;
  enableCreate?: boolean;
  enableEdit?: boolean;
  enableDelete?: boolean;
  emptyMessage?: string;
  createButtonText?: string;
  mapItemToForm?: (item: T) => Record<string, any>;
}

const formatDateForInput = (dateString: string): string => {
  try {
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return dateString;
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) return date.toISOString().split("T")[0];
    return dateString;
  } catch {
    return dateString;
  }
};

const prepareEditData = <T,>(
  item: T,
  fields: FieldConfig<any>[],
  mapItemToForm?: (item: T) => Record<string, any>
): T => {
  const data: any = { ...item };

  if (mapItemToForm) {
    Object.assign(data, mapItemToForm(item));
  }

  fields.forEach((field) => {
    const value = data[field.key];
    if (field.type === "date" && typeof value === "string") {
      data[field.key] = formatDateForInput(value);
    }
  });

  return data as T;
};

export default function GenericList<T>({
  title,
  icon,
  useData,
  columns,
  formFields,
  searchKeys,
  searchPlaceholder = "Buscar...",
  idKey = "id" as keyof T,
  enableCreate = true,
  enableEdit = false,
  enableDelete = true,
  emptyMessage = "No hay datos para mostrar.",
  createButtonText = "Añadir Nuevo",
  mapItemToForm,
}: GenericListProps<T>) {
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);

  const {
    isOpen,
    alertConfig,
    showAlert,
    hideAlert,
    onConfirmCallback,
    onCancelCallback,
  } = useAlert();

  const {
    items,
    loading,
    error,
    createItem,
    updateItem,
    deleteItem,
    getItemById,

    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    setCurrentPage,
    setItemsPerPage,
    searchTerm,
    setSearchTerm,
  } = useData();

  const handleCreate = useCallback(
    async (data: any) => {
      try {
        await createItem(data);
        setShowModal(false);
        showAlert({
          type: "success",
          title: "Registro creado",
          message: "El registro se ha creado exitosamente.",
        });
        setTimeout(() => hideAlert(), 2000);
      } catch (err: any) {
        showAlert({
          type: "error",
          title: "Error al crear",
          message: err.message || "No se pudo crear el registro.",
          confirmText: "Aceptar",
        });
      }
    },
    [createItem, showAlert, hideAlert]
  );

  const handleEdit = useCallback(
    async (item: T) => {
      const id = item[idKey] as unknown as number;

      let fullItem = item;
      if (getItemById) {
        const fetched = await getItemById(id);
        if (fetched) fullItem = fetched;
      }

      const formatted = prepareEditData(fullItem, formFields, mapItemToForm);
      setEditingItem(formatted);
      setShowModal(true);
    },
    [idKey, getItemById, formFields, mapItemToForm]
  );

  const handleUpdate = useCallback(
    async (data: any) => {
      if (!updateItem || !editingItem) return;
      const id = editingItem[idKey] as unknown as number;

      try {
        await updateItem(id, data);
        setShowModal(false);
        setEditingItem(null);
        showAlert({
          type: "success",
          title: "Registro actualizado",
          message: "El registro se ha actualizado exitosamente.",
        });
        setTimeout(() => hideAlert(), 2000);
      } catch (err: any) {
        showAlert({
          type: "error",
          title: "Error al actualizar",
          message: err.message || "No se pudo actualizar el registro.",
          confirmText: "Aceptar",
        });
      }
    },
    [updateItem, editingItem, idKey, showAlert, hideAlert]
  );

  const handleDelete = useCallback(
    async (item: T) => {
      if (!deleteItem) return;
      const id = item[idKey] as unknown as number;

      showAlert(
        {
          type: "warning",
          title: "Confirmar eliminación",
          message:
            "¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.",
          confirmText: "Eliminar",
          cancelText: "Cancelar",
        },
        async () => {
          try {
            await deleteItem(id);
            showAlert({
              type: "success",
              title: "Registro eliminado",
              message: "El registro se ha eliminado exitosamente.",
            });
            setTimeout(() => hideAlert(), 2000);
          } catch (err: any) {
            showAlert({
              type: "error",
              title: "Error al eliminar",
              message: err.message || "No se pudo eliminar el registro.",
              confirmText: "Aceptar",
            });
          }
        }
      );
    },
    [deleteItem, idKey, showAlert, hideAlert]
  );

  const columnsWithActions: ColumnConfig<T>[] = useMemo(() => {
    if (!enableEdit && !enableDelete) return columns;

    const actionsColumn: ColumnConfig<T> = {
      key: "actions" as keyof T,
      header: "Acciones",
      className: "text-center w-32",
      render: (item: T) => (
        <ActionButtons
          item={item}
          enableEdit={enableEdit}
          enableDelete={enableDelete}
          onEdit={updateItem ? handleEdit : undefined}
          onDelete={deleteItem ? handleDelete : undefined}
        />
      ),
    };

    return [...columns, actionsColumn];
  }, [
    columns,
    enableEdit,
    enableDelete,
    updateItem,
    deleteItem,
    handleEdit,
    handleDelete,
  ]);

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  if (loading) {
    return (
      <div className="w-full mx-auto p-8 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl p-6 lg:p-10">
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-600">Cargando datos...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full mx-auto p-8 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl p-6 lg:p-10">
          <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Error al cargar datos
            </h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl p-6 lg:p-10">
        <div className="flex justify-between items-center pb-6 border-b border-gray-200 mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">
            {icon && <span className="mr-2">{icon}</span>}
            {title}
          </h1>

          {enableCreate && (
            <Button
              variant="primary"
              icon={PlusIcon}
              onClick={() => setShowModal(true)}
            >
              {createButtonText}
            </Button>
          )}
        </div>

        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder={searchPlaceholder}
        />

        {searchTerm && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
            <p className="text-sm text-blue-700">
              Buscando: <strong>{searchTerm}</strong>
              {totalItems > 0 &&
                ` - ${totalItems} resultado${
                  totalItems !== 1 ? "s" : ""
                } encontrado${totalItems !== 1 ? "s" : ""}`}
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Limpiar búsqueda
            </button>
          </div>
        )}

        <DynamicTable
          data={items}
          columns={columnsWithActions}
          emptyMessage={
            searchTerm
              ? `No se encontraron resultados para "${searchTerm}"`
              : emptyMessage
          }
        />

        {totalItems > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        )}

        <Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          title={editingItem ? "Editar Registro" : "Crear Nuevo Registro"}
        >
          <DynamicForm
            initialData={editingItem || {}}
            fields={formFields}
            onSubmit={editingItem ? handleUpdate : handleCreate}
            onCancel={handleCloseModal}
            submitButtonText={editingItem ? "Actualizar" : "Guardar"}
          />
        </Modal>

        <Alert
          isOpen={isOpen}
          type={alertConfig.type}
          title={alertConfig.title}
          message={alertConfig.message}
          confirmText={alertConfig.confirmText}
          cancelText={alertConfig.cancelText}
          onConfirm={onConfirmCallback}
          onCancel={onCancelCallback}
          onClose={hideAlert}
        />
      </div>
    </div>
  );
}
