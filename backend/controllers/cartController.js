const { pool } = require("../config/database")
const catchAsyncErrors = require("../middleware/catchAsynErrors")
const { v4: uuidv4 } = require("uuid")
const errorHandler = require("../utils/errorHandler")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

//generate random uuid

const generate_uuid = () => {
    return uuidv4()
}


//add to cart

exports.addToCart = catchAsyncErrors(async(req, res, next) => {
    const { product } = req.body
    const { cartId } = req.user[0][0]
    
    try{
        const [productInfo] = await pool.execute('SELECT * FROM products WHERE id = ?', [product.id])
        const [cartProduct] = await pool.execute('SELECT * FROM cart_items WHERE cart_id = ? && product_id = ?', [cartId, productInfo[0].id])
        let stock = productInfo[0].stock
        
        if(stock > 0){ //checks whether the stock is greated than 0
            if(cartProduct.length <= 0){ //checks whether the cart has this product in it
                const uuid = generate_uuid()
                stock = stock - 1
                await pool.execute('UPDATE products SET stock = ? WHERE id = ?', [stock, productInfo[0].id])
                await pool.execute('INSERT INTO cart_items (id, cart_id, product_id, quantity) VALUES (?, ?, ?, 1)', [uuid, cartId, productInfo[0].id])
                
                res.status(201).json({
                    success: true,
                    message: `${productInfo[0].name} added successfully to the cart`
                })
            }else{ //updates the quantity of the existing product in the cart
                let quantity = cartProduct[0].quantity + 1
                stock = stock - 1  
                await pool.execute('UPDATE products SET stock = ? WHERE id = ?', [stock, productInfo[0].id])
                await pool.execute('UPDATE cart_items SET quantity = ? WHERE cart_id = ? && product_id = ?', [quantity, cartId, productInfo[0].id])
                res.status(200).json({
                    success: true,
                    message: `updated ${productInfo[0].name}'s quantity to ${quantity}`
                })
            }
        }else{ //returns response as out of stock
            res.status(200).json({
                success: true,
                message: `${productInfo[0].name} is Out of Stock`
            })
        }
    }catch(err){
        return next(new errorHandler("Invalid product.", 400))
    }

})


//remove from cart

exports.removeFromCart = catchAsyncErrors(async(req, res, next) => {
    const { product } = req.body
    const { cartId } = req.user[0][0]

    try{
        const [productInfo] = await pool.execute('SELECT * FROM products WHERE id = ?', [product.id])
        const [cartProduct] = await pool.execute('SELECT * FROM cart_items WHERE cart_id = ? && product_id = ?', [cartId, productInfo[0].id])
        let stock = productInfo[0].stock

        if(cartProduct.length > 0 && cartProduct[0].quantity > 0){
            if(cartProduct[0].quantity > 1){
                let quantity = cartProduct[0].quantity - 1
                stock = stock + 1  
                await pool.execute('UPDATE products SET stock = ? WHERE id = ?', [stock, productInfo[0].id])
                await pool.execute('UPDATE cart_items SET quantity = ? WHERE cart_id = ? && product_id = ?', [quantity, cartId, productInfo[0].id])

                res.status(200).json({
                    success: true,
                    message: `Updated ${productInfo[0].name}'s quantity to ${quantity}`
                })
            }else{
                stock = stock + 1  
                await pool.execute('UPDATE products SET stock = ? WHERE id = ?', [stock, productInfo[0].id])
                await pool.execute('DELETE FROM cart_items WHERE cart_id = ? && product_id = ?', [cartId, productInfo[0].id])

                res.status(200).json({
                    success: true,
                    message: `Removed ${productInfo[0].name} from the cart`
                })
            }

        }else{
            return next(new errorHandler("Invalid product", 400))
        }
    }catch(err){
        return next(new errorHandler(`Something went wrong ${err.message}`, 500))
    }

})

//get all products from the cart referenced to the user

exports.getCartItems = catchAsyncErrors(async(req, res, next) => {
    const { cartId } = req.user[0][0]

    const [cartItems] = await pool.execute('SELECT * FROM cart_items WHERE cart_id = ?', [cartId])

    if(cartItems.length > 0){
        res.status(200).json({
            success: true,
            cart: cartItems
        })
    }else{
        res.status(200).json({
            success: true,
            message: "No items in the cart"
        })
    }
})