import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

import './App.css';

const App = () => {

    /////////////////////////////////// STATE SETTINGS ////////////////////////////////

    const [products, setProducts] = useState([]);

    const [createProductName, setCreateProductName] = useState('');
    const [createProductPrice, setCreateProductPrice] = useState('');

    const [editProductId, setEditProductId] = useState('');
    const [editProductName, setEditProductName] = useState('');
    const [editProductPrice, setEditProductPrice] = useState('');

    const [createProductModal, setCreateProductModal] = useState(false);
    const [editProductModal, setEditProductModal] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    const toggleCreateProductModal = () => setCreateProductModal(!createProductModal);
    const toggleEditProductModal = () => setEditProductModal(!editProductModal);

    /////////////////////////////////// UTILITIES ////////////////////////////////////

    // Function clearing input fields in createProductModal.
    const clearInput = async () => {
        try {
            setCreateProductName('');
            setCreateProductPrice('');
        } catch (err) {
            console.error(err);
        };
    };

    /////////////////////////////////// HTTP REQUESTS ////////////////////////////////

    // GET
    const getProducts = async () => {
        try {
            const productsList = await axios.get('http://localhost:5000/api/products/');
            setProducts(productsList.data);
        } catch (err) {
            console.error(err);
        };
    };

    // POST
    const addProductHandler = async (props) => {
        // VARIANT 1.
        try {
            const newProduct = await axios.post('http://localhost:5000/api/products/', {
                name: createProductName,
                price: createProductPrice,
            });
            const updProducts = [...products, { ...newProduct.data }];
            setProducts(updProducts);
            toggleCreateProductModal();
            clearInput();
            getProducts();
        } catch (err) {
            console.error(err);
        };

        // // VARIANT 2.
        // try {
        //     const newProduct = await axios.post('http://localhost:5000/api/products/', {
        //         name: createProductName,
        //         price: createProductPrice,
        //     });
        //     const updProducts = products.concat({ ...newProduct.data });
        //     setProducts(updProducts);
        //     toggleCreateProductModal();
        //     clearInput();
        //     getProducts();
        // } catch (err) {
        //     console.error(err);
        // };
    };

    // EDIT
    const updateProductHandler = async () => {
        try {
            await axios.put('http://localhost:5000/api/products/' + editProductId, {
                name: editProductName,
                price: editProductPrice,
            });
            const index = products.findIndex((el) => el.id === editProductId);
            const oldElement = products[index];
            const updElement = {
                ...oldElement,
                name: editProductName,
                price: editProductPrice,
            };
            const updProducts = [
                ...products.slice(0, index),
                updElement,
                ...products.slice(index + 1)
            ];
            setProducts(updProducts);
            toggleEditProductModal();
            getProducts();
        } catch (err) {
            console.error(err);
        };
    };

    const editProductHandler = async (id) => {
        try {
            const product = products.find((el) => el.id === id);
            setEditProductId(id);
            setEditProductName(product.name);
            setEditProductPrice(product.price);
            toggleEditProductModal();
        } catch (err) {
            console.error(err);
        };
    };

    // DELETE
    const deleteProductHandler = async (id) => {
        try {
            // VARIANT 1 - simple but with additional unnecessary GET request.
            await axios.delete('http://localhost:5000/api/products/' + id);
            getProducts();

            // // VARIANT 2 - more complex but without unnecessary additional GET request.
            // await axios.delete('http://localhost:5000/api/products/' + id);
            // const index = products.findIndex((el) => el.id === id);
            // const updProducts = [
            //     ...products.slice(0, index),
            //     ...products.slice(index + 1),
            // ];
            // setProducts(updProducts);

            // // VARIANT 3 - alternative without unnecessary additional GET request.
            // await axios.delete('http://localhost:5000/api/products/' + id);
            // const updProducts = products.filter((product) => {
            //     return product.id !== id;
            // });
            // setProducts(updProducts);
        } catch (err) {
            console.error(err);
        };
    };

    /////////////////////////////////// RENDERING ////////////////////////////////

    return (
        <div className='App container'>
            <br />
            <h1>List of Products</h1>
            <br />
            <Button color='success' outline onClick={toggleCreateProductModal}>ADD NEW PRODUCT</Button>
            <br />
            <br />
            <Modal isOpen={createProductModal} toggle={toggleCreateProductModal}>
                <ModalHeader toggle={toggleCreateProductModal}>Please add a new product:</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for='name'>Name:</Label>
                            <Input id='name'
                                placeholder='ex. AMD Ryzen 5 3600'
                                value={createProductName}
                                onChange={(event) => { setCreateProductName(event.target.value) }} />
                            <br />
                            <Label for='price'>Price:</Label>
                            <Input id='price'
                                placeholder='ex. 5000.00'
                                value={createProductPrice}
                                onChange={(event) => { setCreateProductPrice(event.target.value) }} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={addProductHandler}>ADD</Button>{' '}
                    <Button color='secondary' onClick={toggleCreateProductModal}>CANCEL</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={editProductModal} toggle={toggleEditProductModal}>
                <ModalHeader toggle={toggleEditProductModal}>Edit product info:</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for='name'>Name:</Label>
                            <Input id='name'
                                value={editProductName}
                                onChange={(event) => { setEditProductName(event.target.value) }} />
                            <br />
                            <Label for='price'>Price:</Label>
                            <Input id='price'
                                value={editProductPrice}
                                onChange={(event) => { setEditProductPrice(event.target.value) }} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={updateProductHandler}>UPDATE</Button>{' '}
                    <Button color='secondary' onClick={toggleEditProductModal}>CANCEL</Button>
                </ModalFooter>
            </Modal>

            <Table bordered striped size='sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>
                                <Button color='secondary' size='sm' className='mr-2' outline onClick={() => { editProductHandler(product.id) }}>EDIT</Button>{' '}
                                <Button color='danger' size='sm' outline onClick={() => { deleteProductHandler(product.id) }}>DELETE</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default App;