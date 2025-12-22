interface PageProps {
  params: {
    pei_poa: string;
  };
}
const page = async ({params}: PageProps) => {
    const {pei_poa} = await params;
  return (
    <div>{pei_poa}</div>
  )
}

export default page