import React from "react";
import OrganizationItem from "./OrganizationItem";
import orgs from "../../data/organizations";

const Organizations = () => {
  return (
    <div>
      <h2 style={{ color: "#000", fontWeight: 800, marginTop: "2rem" }}>Organizations</h2>
      <p className="lead">
        Browse student organizations at UMD
      </p>
      <div className="mt-3">
        {orgs.map(org => (
          <OrganizationItem key={org.id} org={org} />
        ))}
      </div>
    </div>
  );
};

export default Organizations;
