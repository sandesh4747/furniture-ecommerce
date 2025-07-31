import Joi from "joi";
import validate from "express-joi-validation";

// Create validator instance
export const validates = validate.createValidator({});

// Auth Schemas
export const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "any.required": "Email is required",
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),
  password: Joi.string().trim().min(8).max(20).required().messages({
    "any.required": "Password is required",
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters long",
    "string.max": "Password must be at most 20 characters long",
  }),
});

export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(20).required().messages({
    "any.required": "Username is required",
    "string.empty": "Username is required",
    "string.min": "Username must be at least 3 characters long",
    "string.max": "Username must be at most 20 characters long",
  }),
  email: loginSchema.extract("email"),
  password: loginSchema.extract("password"),
});

// Product Schema
export const productSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "any.required": "Product name is required",
    "string.empty": "Product name is required",
    "string.min": "Product name must be at least 3 characters long",
    "string.max": "Product name must be at most 100 characters long",
  }),
  sku: Joi.string().min(3).max(100).required().messages({
    "any.required": "Product SKU is required",
    "string.empty": "Product SKU is required",
    "string.min": "Product SKU must be at least 3 characters long",
    "string.max": "Product SKU must be at most 100 characters long",
  }),

  description: Joi.string().allow("").min(3).max(1000).optional().messages({
    "string.min": "Description must be at least 3 characters long",
    "string.max": "Description must be at most 1000 characters long",
  }),

  price: Joi.number().min(0).required().messages({
    "any.required": "Product price is required",

    "number.min": "Product price must be at least 0",
  }),

  category: Joi.string()
    .valid("Sofas", "Chairs", "Tables", "Outdoor", "Desks")
    .required()
    .messages({
      "any.only": "Invalid product category",
      "any.required": "Category is required",
      "string.empty": "Category cannot be empty",
    }),

  discount: Joi.number().min(0).max(100).empty("").optional().messages({
    "number.min": "Discount can't be less than 0",
    "number.max": "Discount can't be more than 100%",
  }),

  stock: Joi.number().integer().min(1).required().messages({
    "any.required": "Stock count is required",

    "number.min": "Stock must be at least 1",
  }),
  inStock: Joi.boolean().truthy("true").falsy("false").optional().messages({}),
  isFeatured: Joi.boolean()
    .truthy("true")
    .falsy("false")
    .optional()
    .messages({}),
  status: Joi.string().required().messages({}),
  tags: Joi.array().items(Joi.string()).optional().messages({}),
});

export const orderSchema = Joi.object({
  orderNumber: Joi.string().optional().messages({
    "any.required": "Order number is required",
    "string.empty": "Order number cannot be empty",
  }),

  user: Joi.string().required().messages({
    "any.required": "User ID is required",
    "string.empty": "User ID cannot be empty",
  }),

  items: Joi.array()
    .min(1)
    .items(
      Joi.object({
        product: Joi.string().required().messages({
          "any.required": "Product ID is required",
          "string.empty": "Product ID cannot be empty",
        }),
        quantity: Joi.number().min(1).required().messages({
          "any.required": "Quantity is required",
          "number.base": "Quantity must be a number",
          "number.min": "Quantity must be at least 1",
        }),
        name: Joi.string().required().messages({
          "any.required": "Product name is required",
          "string.empty": "Product name cannot be empty",
        }),
        price: Joi.number().min(0).required().messages({
          "any.required": "Price is required",

          "number.min": "Price must be at least 0",
        }),
        image: Joi.string().optional(), // Made optional since it might not be needed for order processing
      })
    )
    .required()
    .messages({
      "array.base": "Items must be an array",
      "array.min": "At least one item is required",
    }),

  shippingAddress: Joi.object({
    firstName: Joi.string().required().messages({
      "any.required": "First name is required",
      "string.empty": "First name cannot be empty",
    }),
    lastName: Joi.string().required().messages({
      "any.required": "Last name is required",
      "string.empty": "Last name cannot be empty",
    }),
    streetAddress: Joi.string().required().messages({
      "any.required": "Street address is required",
      "string.empty": "Street address cannot be empty",
    }),
    city: Joi.string().required().messages({
      "any.required": "City is required",
      "string.empty": "City cannot be empty",
    }),
    zipCode: Joi.string().pattern(/^\d+$/).required().messages({
      "any.required": "ZIP code is required",
      "string.pattern.base": "ZIP code must contain only numbers",
    }),
    country: Joi.string()
      .valid("Nepal", "India", "China", "Sri Lanka")
      .required()
      .messages({
        "any.only": "Invalid country selection",
        "any.required": "Country is required",
      }),
    phone: Joi.string().pattern(/^\d+$/).required().messages({
      "any.required": "Phone number is required",
      "string.pattern.base": "Phone number must contain only numbers",
    }),
    province: Joi.string()
      .valid(
        "Eastern Province",
        "Northern Province",
        "Southern Province",
        "Western Province"
      )
      .required()
      .messages({
        "any.only": "Invalid province selection",
        "any.required": "Province is required",
      }),
    companyName: Joi.string().allow("").optional(),
    email: Joi.string().email().required().messages({
      "string.email": "Please enter a valid email address",
    }),
  })
    .required()
    .messages({
      "object.base": "Shipping address is required",
    }),

  paymentStatus: Joi.string()
    .valid("pending", "paid", "failed", "cancelled")
    .default("pending")
    .messages({
      "any.only": "Invalid payment status",
    }),

  deliveryStatus: Joi.string()
    .valid("dispatch", "readyToPickup", "outForDelivery", "delivered")
    .default("dispatch")
    .messages({
      "any.only": "Invalid delivery status",
    }),

  paymentMethod: Joi.string()
    .valid("cashOnDelivery", "PayPal", "Mastercard")
    .default("cashOnDelivery")
    .messages({
      "any.only": "Invalid payment method",
    }),

  totalAmount: Joi.number().min(0).required().messages({
    "any.required": "Total amount is required",
    "number.base": "Total must be a number",
    "number.min": "Total must be at least 0",
  }),

  additionalInfo: Joi.string().allow("").optional(),
});
