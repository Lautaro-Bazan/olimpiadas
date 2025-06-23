import { useEffect, useState } from "react";
import { gql } from "graphql-request";
import { useGraphQL } from "../../../graphql/useGraphQL";
import { useMutationGraphQL } from "../../../graphql/useMutationGraphQL";
import { Button } from "../../../components/common/buttons/mainButton";

const GET_COMPANIES = gql`
  query {
    companies {
      id
      name
      area
      nit
      email
    }
  }
`;

const UPDATE_COMPANY = gql`
  mutation UpdateCompany($id: ID!, $name: String!, $area: String!, $email: String!, $nit: String!) {
    updateCompany(id: $id, name: $name, area: $area, email: $email, nit: $nit) {
      id
      name
      area
      email
      nit
    }
  }
`;

export const CompanyDataComponent = () => {
  const { data, loading, error, refetch } = useGraphQL(GET_COMPANIES);
  const { mutate } = useMutationGraphQL();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    if (data?.companies?.length) {
      setCompany(data.companies[0]);
    }
  }, [data]);

  if (loading) return <p>Cargando información de la empresa...</p>;
  if (error) return <p>Error al cargar los datos.</p>;
  if (!company) return <p>No se encontraron datos de empresa.</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await mutate(UPDATE_COMPANY, {
        id: company.id,
        name: company.name,
        area: company.area,
        email: company.email,
        nit: company.nit
      });
      alert("Cambios guardados correctamente");
    } catch (err) {
      alert("Error al guardar los cambios");
      console.error("Error al guardar los cambios:", err);
    }
  };

  const handleCancel = async () => {
    await refetch();
    if (data?.companies?.length) {
      setCompany(data.companies[0]);
    }
  };

  return (
    <div className="component-container">
      <h1 className="page-title">Datos de la Empresa</h1>
      <div className="company-info">
        <div className="info-card">
          <h3>Información General</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Nombre de la Empresa:</label>
              <input
                type="text"
                name="name"
                value={company.name}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div className="info-item">
              <label>NIT:</label>
              <input
                type="text"
                name="nit"
                value={company.nit}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div className="info-item">
              <label>Área:</label>
              <input
                type="text"
                name="area"
                value={company.area}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div className="info-item">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={company.email}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>
        </div>

        <div className="actions-bar">
          <Button onClick={handleSave}>Guardar Cambios</Button>
          <Button onClick={handleCancel}>Cancelar</Button>
        </div>
      </div>
    </div>
  );
};
