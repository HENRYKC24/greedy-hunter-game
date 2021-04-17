import React, { useState } from "react";
import {
  DropdownButton,
  FormControl,
  InputGroup,
  Button,
  Dropdown,
  Modal,
} from "react-bootstrap";
import fakeData from "../../fakeData/fakeData";
import cart from "../../assets/Cart.png";
import search from "../../assets/search.png";
import fakeNames from "../faka/fakeName";

function Products() {
  const [dropdown, setDropdown] = useState("");
  const [shoppingCart, setShoppingCart] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [i, setI] = useState(0);

  const [showDrop, setShowDrop] = useState(false);
  const [showDropArray, setShowDropArray] = useState([]);
  const tempArray = [];
  const showDropdown = (index) => {
    tempArray[index] = true;
    setShowDropArray(tempArray);
  };
  const hideDropdown = (index) => {
    tempArray[index] = true;
    setShowDropArray(tempArray);
  };

  return (
    <div className="col-md-10 mt-5 container">
      <div className="d-flex flex-wrap justify-content-center">
        <div>
          {/* <Button variant="warning" className="px-5 mr-5">
            <img
              height="20"
              width="30"
              src={cart}
              alt=""
              style={{ position: "relative" }}
            />
            <p
              style={{
                position: "absolute",
                marginTop: "-3.4vh",
                marginLeft: ".50vw",
              }}
            >
              {shoppingCart || 0}
            </p>
            <small className="ml-2">Cart</small>
          </Button> */}
        </div>
        <InputGroup className="mb-3 w-50 mr-5 " row="3">
          <DropdownButton
            as={InputGroup.Prepend}
            variant="outline-success"
            title={dropdown || "Category"}
            id="input-group-dropdown-1"
          >
            <Dropdown.Item
              href="#"
              name="Home"
              onClick={(e) => setDropdown(e.target.name)}
            >
              Home
            </Dropdown.Item>
            <Dropdown.Item
              href="#"
              name="Fashion"
              onClick={(e) => setDropdown(e.target.name)}
            >
              Fashion
            </Dropdown.Item>
            <Dropdown.Item
              href="#"
              name="Mobile"
              onClick={(e) => setDropdown(e.target.name)}
            >
              Mobile
            </Dropdown.Item>
            <Dropdown.Item
              href="#"
              name="Appliance"
              onClick={(e) => setDropdown(e.target.name)}
            >
              Appliances
            </Dropdown.Item>
            <Dropdown.Item
              href="#"
              name="Travel"
              onClick={(e) => setDropdown(e.target.name)}
            >
              Travel
            </Dropdown.Item>
            <Dropdown.Item
              href="#"
              name="Beauty"
              onClick={(e) => setDropdown(e.target.name)}
            >
              Beauty
            </Dropdown.Item>
            {/* <Dropdown.Divider /> */}
            <Dropdown.Item
              href="#"
              name="Toys"
              onClick={(e) => setDropdown(e.target.name)}
            >
              Toys
            </Dropdown.Item>
          </DropdownButton>
          <FormControl
            aria-describedby="basic-addon1"
            placeholder="Please select a category and search for your desired products..."
            style={{ position: "relative" }}
          />
          <img
            src={search}
            height="33"
            alt=""
            style={{
              position: "absolute",
              marginLeft: "39vw",
              marginTop: ".3vh",
            }}
          />
        </InputGroup>
        <div>
          <Button variant="success" className="px-5">
            Sign In
          </Button>
        </div>
      </div>
      <div className="d-flex flex-wrap justify-content-between mt-5 bg-light align-items-center">
        {fakeData.map((data, index, fakeData) => {
          tempArray.push(index);
          if(fakeData.length === index + 1) {

            setShowDropArray(tempArray);
          }
          return (<div key={index} className="text-center" onClick={() => setI(index)}>
          <img
            src={data.img}
            height="100"
            width="150"
            style={{ borderRadius: "7px" }}
            alt=""
            onClick={handleShow}
          />

          <Dropdown
            show={showDropArray[index] === true}
            onMouseEnter={(index) => showDropdown(index)}
            onMouseLeave={(index) => hideDropdown(index)}
          >
            <Dropdown.Toggle variant="transparent" id="dropdown-basic">
              {data.name}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {fakeNames.map((name, index) => (
                <Dropdown.Item key={index}>{name.name}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>)
        }
          
        )}
      </div>
      <div className=" mt-5 bg-light text-center">
        <h3 style={{ borderBottom: "2px solid black" }}>
          Top Home Products (10,000)
        </h3>
        <div className="d-flex flex-wrap justify-content-between mt-5 bg-light align-items-center">
          {fakeData.map((data, index) => (
            <div
              key={index}
              className="text-center effect"
              onClick={() => setI(index)}
            >
              <img
                src={data.img}
                height="100"
                width="150"
                style={{ borderRadius: "7px" }}
                alt=""
                onClick={handleShow}
              />
              <h5>{data.name}</h5>
            </div>
          ))}
          <Button variant="primary">View all</Button>
        </div>
      </div>
      <div className=" mt-5 bg-light text-center">
        <h3 style={{ borderBottom: "2px solid black" }}>
          Top Mobile Products (10,000)
        </h3>
        <div className="d-flex flex-wrap justify-content-between mt-5 bg-light align-items-center">
          {fakeData.map((data, index) => (
            <div
              key={index}
              className="text-center effect"
              onClick={() => setI(index)}
            >
              <img
                src={data.img}
                height="100"
                width="150"
                style={{ borderRadius: "7px" }}
                alt=""
                onClick={handleShow}
              />
              <h5>{data.name}</h5>
            </div>
          ))}
          <Button variant="primary">View all</Button>
        </div>
      </div>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{fakeData[i].name}</Modal.Title>
          </Modal.Header>
          <img src={fakeData[i].img} className="img-fluid" />
          <Modal.Body>
            Product Discription and Details here Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Ab nam in facilis qui repellat placeat
            maxime, a perferendis nemo quidem expedita illum eius commodi itaque
            tempora sit asperiores dolorum recusandae laboriosam eaque numquam
            inventore voluptatibus vero totam. Corporis fuga earum itaque!
            Similique dolore ratione voluptatibus voluptas, labore mollitia
            quidem perspiciatis?
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={handleClose}>
              Buy Now
            </Button>
            <Button
              variant="warning"
              onClick={() => setShoppingCart(shoppingCart + 1)}
            >
              Add To Cart
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Products;