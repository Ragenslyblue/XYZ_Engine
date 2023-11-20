// ResultPage.js
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FaFilePdf } from "react-icons/fa6";


const ResultPage = ({ formData, manualMinMax = {} }) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
  return (
    <div className='step_one_result'>
        <div className='downloadPdf'>
        <FaFilePdf onClick={handlePrint}/>
            {/* <button onClick={handlePrint}>Download as PDF</button> */}
        </div>
      <div ref={componentRef} className='pdf-layout'>
      <h2>Result Page</h2>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(formData).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
          {/* {console.log("manualMinMax",manualMinMax)} */}
          {manualMinMax?.maxX ? Object.entries(manualMinMax).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          )) : null}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ResultPage;
