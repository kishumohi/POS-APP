import { useDispatch } from "react-redux";
import DefaultLayout from "../components/Defaut_Layout/DefaultLayout.jsx";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { EyeOutlined } from "@ant-design/icons";
import { HideLoading, ShowLoading } from "../redux/CartItemCount.js";
import { Button, Modal, Table } from "antd";
import "../styles/InvoiceStyles.css";
import { useReactToPrint } from "react-to-print";
function BillsPage() {
  // Declare Variable
  const componentRef = useRef();
  const [billsData, setbillsData] = useState([]);
  const [popupModel, setPopupModel] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  // console.log(itemsData);
  // hook define

  const dispatch = useDispatch();
  // Initial State Define and Data Get From API
  const getAllBills = async () => {
    try {
      dispatch(ShowLoading());
      const { data } = await axios.get("/api/bills/get-bills");
      setbillsData(data);
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      console.log("Error From Get-Data From Server :- ", error);
    }
  };
  useEffect(() => {
    getAllBills();
  }, [dispatch]);
  // table column details
  const columns = [
    { title: "ID", dataIndex: "_id" },
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    { title: "Contact No", dataIndex: "customerNumber" },
    { title: "Sub Amount", dataIndex: "subTotal" },
    { title: "Tax", dataIndex: "tax" },
    { title: "Total Amount", dataIndex: "totalAmount" },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EyeOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedBill(record);
              setPopupModel(true);
            }}
          />
        </div>
      ),
    },
  ];
  // print function
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Bill Items</h1>
      </div>
      <Table columns={columns} dataSource={billsData} bordered />
      {popupModel && (
        <Modal
          title="Invoice Details"
          visible={popupModel}
          onCancel={() => {
            setSelectedBill(false);
            setPopupModel(false);
          }}
          footer={false}
        >
          {/* ============ invoice modal start ==============  */}
          <div id="invoice-POS" ref={componentRef}>
            <center id="top">
              {/* <div className="logo" /> */}
              <div className="info">
                <h2>Kishan Kalavadiya</h2>
                <p> Contact : 123456 | Morbi Gujarat</p>
              </div>
              {/*End Info*/}
            </center>
            {/*End InvoiceTop*/}
            <div id="mid">
              <div className="mt-2">
                <p>
                  Customer Name : <b>{selectedBill.customerName}</b>
                  <br />
                  Phone No : <b>{selectedBill.customerNumber}</b>
                  <br />
                  Date : <b>{selectedBill.date.toString().substring(0, 10)}</b>
                  <br />
                </p>
                <hr style={{ margin: "5px" }} />
              </div>
            </div>
            {/*End Invoice Mid*/}
            <div id="bot">
              <div id="table">
                <table>
                  <tbody>
                    <tr className="tabletitle">
                      <td className="item">
                        <h2>Item</h2>
                      </td>
                      <td className="Hours">
                        <h2>Qty</h2>
                      </td>
                      <td className="Rate">
                        <h2>Price</h2>
                      </td>
                      <td className="Rate">
                        <h2>Total</h2>
                      </td>
                    </tr>
                    {selectedBill.cartItems.map((item) => (
                      <>
                        <tr className="service">
                          <td className="tableitem">
                            <p className="itemtext">{item.name}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{item.quantity}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{item.price}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">
                              {item.quantity * item.price}
                            </p>
                          </td>
                        </tr>
                      </>
                    ))}

                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate">
                        <h2>tax</h2>
                      </td>
                      <td className="payment">
                        <h2>${selectedBill.tax}</h2>
                      </td>
                    </tr>
                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate">
                        <h2>Grand Total</h2>
                      </td>
                      <td className="payment">
                        <h2>
                          <b>${selectedBill.totalAmount}</b>
                        </h2>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/*End Table*/}
              <div id="legalcopy">
                <p className="legal">
                  <strong>Thank you for your order!</strong> 10% GST application
                  on total amount.Please note that this is non refundable amount
                  for any assistance please write email
                  <b> help@mydomain.com</b>
                </p>
              </div>
            </div>
            {/*End InvoiceBot*/}
          </div>
          {/*End Invoice*/}
          <div className="d-flex justify-content-end mt-3">
            <Button type="primary" onClick={handlePrint}>
              Print
            </Button>
          </div>
          {/* ============ invoice modal ends ==============  */}
        </Modal>
      )}
    </DefaultLayout>
  );
}

export default BillsPage;
