import React, { useEffect, useState } from 'react'
import TokenChecker from '../hooks/tokenChecker';
import { useNavigate } from 'react-router-dom';
import { Accordion, Table } from 'react-bootstrap';
import makeRequest from '../utils/apiCall';
import { dataManipulation } from '../utils/dataManipulation';
import NavbarComponent from '../components/NavbarComponent';

function Product() {
    const { hasToken } = TokenChecker();
    const navigate = useNavigate();
    const [productList, setProductList] = useState([]);
    const [userName, setUserName] = useState('');


    // Product data fecther 
    async function getProductList() {
        const apiEndPoint = "https://dummyjson.com/products";


        const apiResponseOfUserProfile = await makeRequest('GET', `${process.env.REACT_APP_INTERNAL_SERVER_BASE_URL}auth/profile`);

        if (apiResponseOfUserProfile && apiResponseOfUserProfile.status === 200) {
            setUserName(apiResponseOfUserProfile.data.userName)
        }

        const apiResponse = await makeRequest('GET', apiEndPoint);
        setProductList(dataManipulation(apiResponse.products))

    }


    // Check user is logged in or not, If logged in then navigate to product route
    useEffect(() => {
        const isUserLoggedIn = hasToken();
        if (!isUserLoggedIn) {
            navigate("/")
        }
        // Fetch data from product api
        getProductList()

    }, [])

    console.log(productList)

    return (
        <>
            <NavbarComponent isHomePage={false} userName={userName} />
            <h2 style={{ textAlign: 'center' }}>Product List</h2>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    minHeight: "100vh",
                    justifyContent: "center",
                    margin: "20px 20px",
                }}
            >
                <div style={{
                    width: "50%",

                }}>
                    <div style={{ marginTop: "50px" }}>

                        {
                            productList && productList.map((category, idx) =>
                            (<>
                                <Accordion >
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header key={idx}>{category.keyName}</Accordion.Header>
                                        <Accordion.Body>
                                            <Table striped bordered hover variant="light">
                                                <thead>
                                                    <tr>
                                                        <th>Product Id</th>
                                                        <th>Thumbnail</th>
                                                        <th>Title</th>
                                                        <th>Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {category.data.map((product, i) => (
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>
                                                                <img
                                                                    src={product.thumbnail}
                                                                    alt={product.name}
                                                                    width="50"
                                                                    height="50"
                                                                />
                                                            </td>
                                                            <td>{product.title}</td>
                                                            <td>{product.price}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </>
                            )
                            )
                        }


                    </div>
                </div>
            </div>
        </>
    );
}

export default Product
