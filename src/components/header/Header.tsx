import { useContext, useEffect, useState } from "react";

import "./header.scss";
import { Col, Row, Select, Drawer, Badge, Dropdown, Carousel } from "antd";
import imgLogo from "../../assets/logo.jpg";
import { isEmpty, isNil } from "lodash";
import { getStorageArr } from "../../helpers/storagesFunc";
import { namesStorage } from "../../initData/namesStorage";

// INTERFACES AND TYPES
import { courseCategoriesT } from "../../typesInterfaces/types";
import { Link, useNavigate } from "react-router-dom";
import { CartContextHook } from "../../context/CartContextProvider";

import emptyCart from "../../assets/empty-box.png";
import { CategoryContextHook } from "../../context/categoryContextProvider";
import { AuthContextHook } from "../../context/AuthContextProvider";
import { simpleAlertTimer } from "../../helpers/alerts";
import GlobalLoader from "../loader/GlobalLoader";

type categoriesCatalog = {
  value: courseCategoriesT;
  label: courseCategoriesT;
};

const Header = () => {
  const { cartCtx, removeCourseCtx } = useContext(CartContextHook);
  const { currentCategoryCtx, updateCurrentCategory } =
    useContext(CategoryContextHook);
  const { authInfo, isAuth, closeAuth } = useContext(AuthContextHook);

  const [showGlobalLoader, setShowGlobalLoader] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [categories, setCategories] = useState<categoriesCatalog[]>([]);

  const NAVIGATE = useNavigate();

  const makeCategoriesCatalog = () => {
    // las categorias en storage son un array, hay que transformala a [{value: category, label: category}] como
    // lo pide el componente... para eso el typ categoriesCatalog

    const data = getStorageArr({
      name: namesStorage.categoriesStorage,
    });

    if (isNil(data) === false && isEmpty(data) === false) {
      const catalog: categoriesCatalog[] = data.map((c: courseCategoriesT) => {
        const objCategory: categoriesCatalog = {
          label: c,
          value: c,
        };

        return objCategory;
      });
      setCategories(catalog);
    }
  };

  const redirectMainPage = () => {
    NAVIGATE("/");
  };

  const payCart = () => {
    
    if (isAuth === false) {
      return simpleAlertTimer({
        title: 'Es necesario inciar sesión',
        icon: 'info',
        timer: 2000
      });
    }

    setShowCart(false);
    NAVIGATE(`/cart/${authInfo.idUser}`);

  }

  const showGlobalLoaderFn = (value: boolean) => {
    setShowGlobalLoader(value);
    setTimeout(() => {
      setShowGlobalLoader(false);
    }, 1400); 
  }

  useEffect(() => {
    makeCategoriesCatalog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    {
      showGlobalLoader === true && (
        <GlobalLoader />
      )
    }
      <header className="p-2 header-style">
        <Row className="justify-content-between">
          <Col md={2} className="d-flex align-items-center">
            <div
              className="d-flex align-items-center"
              style={{ cursor: "pointer" }}
              onClick={() => redirectMainPage()}
            >
              <img
                src={imgLogo}
                alt=""
                width={30}
                height={30}
                className="rounded-circle"
              />
              <p className="mb-0 fw-bold ms-2 text-primary">Online Academy</p>
            </div>
            <Select
              style={{ width: "100%" }}
              className="ms-3"
              placeholder={"Categorías"}
              options={categories}
              // value={categorySelected}
              value={currentCategoryCtx}
              onChange={(c) => {
                updateCurrentCategory(c);
                if (c !== "") {
                  NAVIGATE(`/course/by-category/${c}`);
                }
              }}
            ></Select>
          </Col>

          <Col
            md={10}
            className="d-flex justify-content-end align-items-center"
          >
            {/* <div style={{ width: "40%" }}>
              <Input
                type="text"
                className="fs-14"
                autoComplete={"off"}
                placeholder="Instructor, curso, categoría o tag"
                id="search"
                value={""}
                size="large"
                addonAfter={<i className="fas fa-search text-primary" />}
                onChange={() => {}}
              />
            </div> */}

            <Badge count={cartCtx.infoCourse.length}>
              <div style={{ fontSize: "30px" }} className="ms-3">
                <p
                  className="mb-0 "
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setShowCart(!showCart);
                  }}
                >
                  <i className="fas fa-bag-shopping text-primary"></i>
                </p>
              </div>
            </Badge>

            {isAuth === false && (
              <div className="ms-3">
                <button className="btn btn-outline-dark me-1">
                  <i className="fas fa-door-open me-1 "></i>
                  <Link to={"/login"}>Login</Link>
                </button>

                <button className="btn btn-outline-secondary">
                  <i className="fas fa-address-card me-1 "></i>
                  <Link to={"/register"}>Registrame</Link>
                </button>
              </div>
            )}

            {isAuth === true && (
              <div className="ms-3 d-flex align-items-center">
                <p className="mb-0 me-2 fs-18 fw-bold">{authInfo.name}</p>
                <div>

                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "1",
                        label: (
                          <>
                            <div className="text-center">
                              <Link to={`/profile/${authInfo.idUser}`}>
                                {/* <button className=" "> */}

                                  <p className="mb-0 fs-16 text-primary">
                                    <i className="fas fa-circle-user me-2" ></i>

                                    Mi perfil
                                  </p>
                                  {/* </button> */}
                              </Link>
                            </div>
                          </>
                        ),
                      },
                      {
                        key: "2",
                        label: (
                          <>
                            <div>
                              <button className="btn text-danger"
                              onClick={() => {
                                showGlobalLoaderFn(true);
                                setTimeout(() => {
                                  closeAuth();
                                }, 1000);
                              }}
                              >
                                <i className="fa-solid fa-door-closed me-2"></i>{" "}
                                Cerrar sesión
                              </button>
                            </div>
                          </>
                        ),
                      },
                    ],
                  }}
                >
                  <div className="profile-header">
                    <img src={authInfo.userPicture} alt="" />
                  </div>
                </Dropdown>
                </div>
              </div>
            )}
          </Col>
        </Row>

        {/* CART DRAWER */}
        <Drawer
          width={450}
            // style={{position: 'relative'}}
          title={
            <>
              <p className="mb-0 text-primary ">Cursos listos para tí</p>
            </>
          }
          onClose={() => {
            setShowCart(!showCart);
          }}
          open={showCart}
        >
          <section
            className="cart-drawer-section"
          >
            {/* placeholder si no hay data  */}
            {isNil(cartCtx.infoCourse) === true ||
              (isEmpty(cartCtx.infoCourse) === true && (
                <div className="no-content-container">
                  <div className="no-content-image">
                    <img src={emptyCart} alt="" />
                  </div>
                  <p className="text-primary fs-22 fw-bold text-center">
                    Aún no se han agregado cursos a tu carrito
                  </p>
                </div>
              ))}

            {/* data */}
            {isEmpty(cartCtx.infoCourse) === false && (
              <>
              <Carousel dotPosition="left"
              dots={false}
          slidesToShow={2}
          autoplay
          arrows
          infinite={false}
          className="carousel-cart"
        >
                {cartCtx.infoCourse.map((c, idx) => {
                  return (
                    <div className="mb-3 card-cart ">
                      <div className="card-cart-content">
                      <div className="badge bg-primary d-flex align-items-center me-1 fw-bold fs-12">
                        <p className="mb-0" >{idx + 1}</p>
                      </div>
                        <div className="card-cart-img">
                          <img src={c.imageCourse} alt={c.titleCourse} />
                        </div>
                        <div className="ps-2 ">
                          <p className="mb-3 fw-bold">{c.titleCourse}</p>
                          <p className="mb-0 text-50">{c.teacherName}</p>

                          <div className="d-flex">
                            <p className="mb-0 me-2 fw-bold">
                              ${c.discountPrice}
                            </p>
                            <p className="mb-0 text-decoration-line-through text-50">
                              ${c.price}
                            </p>
                            <span>
                              <i className="fas fa-coins ms-1 text-warning"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-end card-delete">
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => {
                            removeCourseCtx(c.idCourse);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}

        </Carousel>

                <div className="cart-pay-section">
                  <p className="fw-bold mb-0 fs-20">Total</p>
                  <div className="bg-dark d-flex text-white justify-content-between rounded p-3 align-items-center">
                    <p className="mb-0 fw-bold fs-20 ">
                      ${cartCtx.total.toFixed(2)}
                      <i className="fas fa-coins text-warning ms-1"></i>
                    </p>
                    <p className="bg-danger p-2 mb-0 text-decoration-line-through  fs-16">
                      ${cartCtx.totalDiscount.toFixed(2)}
                    </p>
                  </div>
                  <div className="">
                    <button className="w-100 btn btn-primary mt-1"
                      onClick={() => {
                        payCart();
                      }}
                    >
                      {" "}
                      <i className="fas fa-credit-card me-2"></i> Pagar
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>
        </Drawer>
      </header>
    </>
  );
};

export default Header;
