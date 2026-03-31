import { StatusCodes } from "http-status-codes";
import stripe from "../config/stripe.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";

export const createCheckoutSession = async (req, res) => {
  const { courseId } = req.body;
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: "Course not found" });
  }

  if (course.price <= 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "This is a free course" });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/payment-success?courseId=${courseId}`,
    cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(course.price * 100),
          product_data: {
            name: course.title,
            description: course.description
          }
        }
      }
    ],
    metadata: {
      userId: req.user._id.toString(),
      courseId: course._id.toString()
    }
  });

  return res.status(StatusCodes.OK).json({ url: session.url });
};

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const data = event.data.object;
    await Enrollment.findOneAndUpdate(
      { userId: data.metadata.userId, courseId: data.metadata.courseId },
      {
        userId: data.metadata.userId,
        courseId: data.metadata.courseId,
        paymentStatus: "paid"
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  return res.status(StatusCodes.OK).json({ received: true });
};
