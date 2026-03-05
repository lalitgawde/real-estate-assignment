import styles from "./BuyerTable.module.css";

const BuyerTable = ({ buyers }) => {
  return (
    <div className={styles["table-wrapper"]}>
      <table className={styles["buyer-table"]}>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Saved Properties</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {buyers.map((buyer, index) => (
            <tr key={buyer.id}>
              <td>{index + 1}</td>
              <td>{buyer.name}</td>
              <td>{buyer.email}</td>
              <td>{buyer.phone}</td>
              <td>{buyer.savedProperties.length}</td>
              <td>
                <span className={styles["role-badge"]}>{buyer.role}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BuyerTable;
