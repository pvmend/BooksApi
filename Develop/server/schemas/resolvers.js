// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query:{
    me: async (parent, vars, context) => {

        return User.findOne({ _id: context.user._id  });
        },

    },
    Mutation: {
    addUser : async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        if(!user){
            throw new AuthenticationError("Could not create user");
        }
        const token = signToken(user);
        return { token , user }
        
    },

    login: async (parent, { email, password }) => {
        const user = await User.findOne({ username });
        if(!user){
            throw new AuthenticationError('No user found');
        }
        const correctPassword = await user.isCorrectPassword(password);
        
        if(!correctPassword){
            throw new AuthenticationError('Incorrect Password or Username');
        }
        const token = signToken(user);
        return { token , user }
    },
    saveBook: async (parent, { book }, context) => {
        if(context.user){
      return User.findOneAndUpdate(
        { _id: context.user._id },
        
        { $addToSet: { savedBooks: book } },
        
        { new: true, runValidators: true }
        
      );
      
        }
        throw new AuthenticationError("You need to be logged in")
        
    },
    removeBook: async (parent, { bookId }, context) => {
        if(context.user){
       return User.findOneAndUpdate(
      { _id: context.user._id  },
      { $pull: { savedBooks: { bookId: bookId } } },
      { new: true }
    );
        }
        throw new AuthenticationError("You need to be logged in")
    }



    }
}

module.exports = resolvers;