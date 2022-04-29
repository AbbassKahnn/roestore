import { Container, Form, FormControl, Nav, Navbar, ThemeProvider } from 'react-bootstrap';
import { Link, useLocation } from "react-router-dom";
import CART from '../../assets/shopping-cart.png';
import OrderModel from '../model/model';
import { useEffect, useState } from 'react';

const NavBar = () => {
  const [active, setActive] = useState(false);
  const toggleModal = (value) => {
    setActive(value);
  }
  const [user, setUser] = useState({});
  
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const logout =() => {
    localStorage.removeItem("user");
    setUser({});
  }

  const [search, setSearh] = useState();

  const searchItem = (e) => {
    e.preventDefault();
    window.location.replace(`/product?${search.replace(' ', '_')}`);
  }
  return (<>
    {active && <OrderModel action={toggleModal} active={active} />}
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    >
      <Container>

        <Navbar expand="lg" className='navigation-container'>
        {user?.user_name !== "admin"? <Navbar.Brand >
            <Link to='/' >E Commerce Store</Link>
          </Navbar.Brand>: <Navbar.Brand >
            <Link to='/orders' >E Commerce Store</Link>
          </Navbar.Brand> }
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-start">
          {user?.user_name !== "admin" ?
          <> <Nav.Link ><Link to='/home'>Home</Link></Nav.Link>
            <Nav.Link> <Link to='/orders'>My orders</Link></Nav.Link>
            </>: <> 
            <Nav.Link ><Link to='/catagory'>Catagories</Link></Nav.Link>
            <Nav.Link ><Link to='/items'>Items</Link></Nav.Link>
            <Nav.Link> <Link to='/orders'>Orders</Link></Nav.Link>
            </>}
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
          {user?.user_name !== "admin" &&
            <Form className="d-flex" onSubmit={searchItem}>
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={search}
                onChange={(e)=> setSearh(e.target.value)}
              />
              <button className="btn btn-info" type='submit'>Search</button>
            </Form>}
            <Navbar.Text className='d-flex'>
               <div className='cursor-pointer px-4'>
               {user?.user_name !== "admin" &&
               <Link to='/cart'>
               <img src={CART} alt='' height={30}  />
               </Link>
               }
              </div>
              <div>

              {user?.user_id? <Link to='/login' >
                <button className='btn btn-danger' onClick={logout}>Logout</button>
                </Link>: <Link to='/login' >
                <button className='btn'>Login</button>
                </Link>}
              </div>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>

      </Container>

    </ThemeProvider>

  </>
  );
}

export default NavBar;
