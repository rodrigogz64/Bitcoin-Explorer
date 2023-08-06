import './TxDetails.css';

interface DecodedTransaction {
  [key: string]: string | number;
}

interface TxDetailsProps {
  decodedTransaction: DecodedTransaction;
}



const TxDetails: React.FC<TxDetailsProps> = ({ decodedTransaction }) => {

  return (
    <div className="transaction-details">
      <h2>Detalles de la transacción:</h2>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(decodedTransaction).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td style={{ wordBreak: 'break-word' }}>
                {typeof value === 'object' ? JSON.stringify(value) : String(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TxDetails;
