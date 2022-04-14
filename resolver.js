import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jsonwebToken from "jsonwebtoken";

const User = mongoose.model("User");
const Quote = mongoose.model("Quote");
const resolvers = {
  Query: {
    users: async () => await User.find({}),
    user: async (_, { _id }) => await User.findById({ _id }),
    quotes: async () => await Quote.find({}).populate("by", "_id firstName"),
    iquote: async (_, { by }) => await Quote.findById({ by }),
    myprofile: async (_, args, { userId }) => {
      if (!userId) throw new Error("You must be logged in");
      return await User.findOne({ _id: userId });
    },
  },
  User: {
    quotes: async (usr) => await Quote.find({ by: usr._id }),
  },
  Mutation: {
    signupUser: async (_, { userNew }) => {
      const user = await User.findOne({ email: userNew.email });
      if (user) {
        throw new Error("user already exisit");
      }
      const hashpassword = await bcrypt.hash(userNew.password, 12);

      const newUser = new User({
        ...userNew,
        password: hashpassword,
      });
      return await newUser.save();
    },

    signInUser: async (_, { userSignIn }) => {
      const user = await User.findOne({ email: userSignIn.email });
      if (!user) {
        throw new Error("user does not exisit");
      }
      const comparePass = bcrypt.compare(user.password, userSignIn.password);
      if (!comparePass) {
        throw new Error("invalid username or password");
      }
      const token = await jsonwebToken.sign(
        { userId: user._id },
        process.env.JWT_SECRET
      );

      return { token };
    },

    createQuote: async (_, { name }, { userId }) => {
      if (!userId) {
        throw new Error("user is not loggedin");
      }
      const newQuote = new Quote({
        name: name,
        by: userId,
      });
      newQuote.save();
      return "Quote is created Successfully";
    },
  },
};

export default resolvers;
