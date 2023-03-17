import React from "react";
import queryString from 'query-string';
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import '../Styles/Details2.css';
import Modal from 'react-modal';
import { get, post } from '../service/service'
import Care from "./Carousel";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const theme = createTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: '#d50000',
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#1b5e20',
        },

    },
});

// const { enqueueSnackbar } = useSnackbar();
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        backgroundColor: '#B0E0E6',
        border: 'solid 2px brown'
    },
};



class Details extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurent: {},
            restaurentModelData: {},
            resId: false,
            galleryModelIsOpen: false,
            menuItemsModalIsOpen: false,
            promenuItemModalIsopen: false,
            totalPrice: 0
        }
    }


    async componentDidMount() {
        const qs = queryString.parse(this.props.location.search)
        const { restaurent } = qs;
        // var newData = await get(`restaurent/getRestaurent/${restaurent}`);
        // var data = {

        // }
        // var newData2 = await post(`restaurent/getRestaurent`, data);
        // console.log(newData, newData2)

        axios({
            method: 'GET',
            url: `http://localhost:3002/api/restaurent/getRestaurentDetails/${restaurent}`,
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            this.setState({ restaurent: response.data.data.restaurent })
        }).catch(err => console.log(err))

    }
    async handleOrder(resId) {
        var result = await get(`restaurent/menuitems/${resId}`).catch((err) => {
            console.log(err);
        })
        if (!result.error) {
            console.log(result.data)
        } else {
            console.log(result.message);
        }
    }
    // handleModal = (state, value) => {
    //     this.setState({ [state]: value })
    // }
    handleModal = async (resmenuId, value) => {
        this.setState({ menuItemsModalIsOpen: value })
        var menuData = await get(`restaurent/Restaurentmenuitems/${resmenuId}`).catch((err) => {
            console.log(err);
        })
        console.log(menuData)
        if (!menuData.error) {
            this.setState({ restaurentModelData: menuData.data.ResMenu })
        }

    }

    closeModal = () => {
        this.setState({ menuItemsModalIsOpen: false })
    }
    addItemHandler = (minprice) => {
        console.log(minprice);
        const { totalPrice } = this.state;
        // let addpay = totalPrice + minprice;
        // console.log(totalPrice);

        this.setState({ totalPrice: totalPrice + minprice });

        // console.log(addpay);


    };
    removeItemHandler = (minprice) => {
        const { totalPrice } = this.state;

        this.setState({ totalPrice: totalPrice - minprice })
    }

    notify = () =>
        toast.success("successfully order placed", { position: toast.POSITION.TOP_LEFT })

    // handleProModal = () => {
    //     this.setState({ promenuItemModalIsopen: true })
    // }
    handleGalleryModal = () => {
        this.setState({ galleryModelIsOpen: true })
    }
    // handlecloseicon = () => {
    //     this.setState({ promenuItemModalIsopen: false })
    // }
    render() {
        const { restaurent, menuItemsModalIsOpen, restaurentModelData, totalPrice } = this.state;
        return (
            <div>
                <div>
                    <Care />
                    <button className="clickSearch" onClick={this.handleGalleryModal}>Click to see image Gallery</button>
                </div>
                <div className="tabs">
                    <h3 className="heading">{restaurent.name}</h3>
                    {/* <p>{restaurent.cuisine}</p> */}
                    <ul>
                        {
                            restaurent?.cuisine?.map((item, index) => (<li key={index} >{`${item.name}`}</li>))
                        }
                    </ul>

                    {/* {restaurent.map((item) => {
                return */}
                    <Tabs>
                        <TabList>
                            <Tab>Overview</Tab>
                            <Tab>Contact</Tab>
                        </TabList>
                        <TabPanel className="pannel">
                            <h4 className="Phone">Phone number</h4>
                            <h4>{restaurent.contact_number}</h4>
                            <br></br>
                            <h3>{restaurent.name}</h3>
                            <p>{restaurent.locality} <br></br> {restaurent.city} 636 105</p>
                        </TabPanel>
                        <TabPanel className="pannel">
                            <h4 className="Phone">Phone number</h4>
                            <h4>{restaurent.contact_number}</h4>
                            <br></br>
                            <h3>{restaurent.name}</h3>
                            <p>{restaurent.locality}<br></br> {restaurent.city} 645 945</p>
                        </TabPanel>
                    </Tabs>
                    {/* })}  */}
                </div>
                <div>
                    <button className="btn-order" onClick={() => this.handleModal(restaurent._id, true)}>Place online order</button>
                </div>
                <Modal
                    isOpen={menuItemsModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <div className="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px' }} onClick={() => this.handleModal('menuItemsModalIsOpen', false)}></div>
                    </div>
                    <div className="container mt-3">
                        <div className="row">
                            <div className="col-md-4">
                                <h2>Menu Modal</h2>
                                <ul class="list-group">
                                    name : {restaurentModelData.name}
                                    <br />
                                    city : {restaurentModelData.city}
                                    <br />
                                    cuisine :
                                    {
                                        restaurentModelData?.cuisine?.map((item, index) => (<li key={index} >{`${item.name}`}</li>))
                                    }
                                    Number : {restaurentModelData.contact_number}
                                    {/* {restaurentModelData?.map((menumod, menu) => {
                                return <li class="list-group-item list-group-item-success" key={menu}>{menumod.name}</li>
                            })} */}
                                </ul>
                                <br />
                                <button className="cancelbtn" onClick={this.closeModal}>Cancel</button>
                            </div>
                            <div className="col-md-4 offset-md-4">
                                <ThemeProvider theme={theme}>
                                    <Button onClick={() => this.removeItemHandler(restaurent.min_price)}>-</Button>
                                    <Button color="secondary" onClick={() => this.addItemHandler(restaurent.min_price)}>+</Button>
                                </ThemeProvider>
                            </div>
                            <div className="col-md-4 offset-md-8 orderdetails">
                                name: {restaurentModelData.name}
                                <br />
                                cuisine :
                                {
                                    restaurentModelData?.cuisine?.map((item, index) => (<li key={index} >{`${item.name}`}</li>))
                                }
                                Price:{totalPrice}
                            </div>
                            <div className="row">
                                <div className="col-md-6 offset-md-3">


                                    <Button className="paynow" color="error" onClick={() => this.notify()}>pay now</Button>
                                    <ToastContainer />
                                </div>
                                {/* <Modal
                                    isOpen={promenuItemModalIsopen}
                                    style={customStyles}
                                >
                                    <div class="container">
                                        <div class="row justify-content-evenly">
                                            <div class="col-4">
                                                <h4>{restaurent.name}</h4>
                                                Name:<br />
                                                <input type="text" placeholder="Enter your name" />
                                                Email:<br />
                                                <input type="text" placeholder="Enter your Email" />
                                                Address:<br />
                                                <input type="text" placeholder="Enter your address" />
                                                Contact number:<br />
                                                <input type="text" placeholder="Enter your contactnumber" />
                                                <br />
                                                <button type="button" class="btn btn-success" onClick={() => this.notify()}>Success</button>
                                            </div>
                                            <div class="col-4">
                                                <i class="fa fa-times" aria-hidden="true" onClick={this.handlecloseicon}></i>

                                            </div>
                                        </div>
                                    </div>
                                </Modal> */}

                            </div>
                        </div>
                    </div>
                </Modal >
            </div >
        )
    }
}
export default Details;