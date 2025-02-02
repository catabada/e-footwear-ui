import { Box, Grid, Typography } from "@mui/material";
import classnames from "classnames/bind";
import { Link } from "react-router-dom";
import { ColorRounded } from "../color";
import CloseIcon from "@mui/icons-material/Close";
import style from "./CartProducts.module.scss";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
const cx = classnames.bind(style);

function CartProducts({ data, removeParentCallback, decreaseCallback, increaseCallback }) {
    return (
        <Box className={cx("product-list")}>
            {data?.map((item, index) => {
                const totalDiscountPrice = item.price * item.quantity;
                const totalOriginPrice = item.detail.product.originPrice * item.quantity;
                return (
                    <Box key={index} className={cx("product-item")}>
                        <Box
                            className={cx("btn-remove")}
                            onClick={() => removeParentCallback(index)}
                        >
                            <CloseIcon sx={{ height: "2rem", width: "2rem", color: "red" }} />
                        </Box>
                        <Box className={cx("product-image")}>
                            <img
                                src={item.detail.product.imageURL}
                                alt={item.detail.product.name}
                            />
                        </Box>
                        <Box className={cx("product-info")}>
                            <Typography variant="h5" className={cx("product-text")}>
                                <Link
                                    to={`/detail/${item.detail.product.slug}/${item.detail.product.color.id}`}
                                    className={cx("product-link")}
                                >
                                    {item.detail.product.name}
                                </Link>
                            </Typography>
                            <Grid
                                container
                                spacing={1}
                                sx={{ marginTop: "1rem" }}
                                className={cx("bottom-info")}
                            >
                                <Grid item xs={2} className={cx("item")}>
                                    <Box>
                                        Màu sắc:{" "}
                                        <ColorRounded
                                            nameColor={item.detail.product.color.codeColor}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={3} className={cx("item")}>
                                    <Typography variant="body1">
                                        Kích thước: {item.detail.size}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} className={cx("item")}>
                                    <Box className={cx("btn-number")}>
                                        <Box
                                            className={cx("btn-change-quantity")}
                                            onClick={() =>
                                                decreaseCallback({
                                                    id: item.detail.product.id,
                                                    size: item.detail.size,
                                                })
                                            }
                                        >
                                            <RemoveIcon />
                                        </Box>
                                        <Box className={cx("show-quantity")}>{item.quantity}</Box>
                                        <Box
                                            className={cx("btn-change-quantity")}
                                            onClick={() =>
                                                increaseCallback({
                                                    id: item.detail.product.id,
                                                    size: item.detail.size,
                                                })
                                            }
                                        >
                                            <AddIcon />
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={4} className={cx("item", "price")}>
                                    <Box>
                                        <Typography variant="body1" className={cx("current-price")}>
                                            {totalDiscountPrice.toLocaleString("it-IT", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </Typography>
                                    </Box>
                                    {item?.discountRate !== 0 && (
                                        <Box>
                                            <Typography variant="body1" className={cx("pre-price")}>
                                                {totalOriginPrice.toLocaleString("it-IT", {
                                                    style: "currency",
                                                    currency: "VND",
                                                })}
                                            </Typography>
                                        </Box>
                                    )}
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
}

export default CartProducts;
