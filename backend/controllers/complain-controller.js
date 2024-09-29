const Complain = require('../models/complainSchema.js');
const Student = require('../models/studentSchema.js');

const complainCreate = async (req, res) => {
    try {
        const { user, date, typeOfTicket, location, description,name } = req.body;

        // Create a new service request object
        const serviceRequest = new Complain({
            user,
            date,
            typeOfTicket,
            location,
            description,
            name
        });

        // Save the service request to the database
        const result = await serviceRequest.save();
        console.log(user);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
// export const updateComplainStatus = (complainId, newStatus) => async (dispatch) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/complains/${complainId}`, { status: newStatus });
//       dispatch({ type: 'COMPLAIN_STATUS_UPDATED', payload: response.data });
//     } catch (error) {
//       console.error('Error updating complain status:', error);
//     }
//   };
const complainList = async (req, res) => {
    try {
        const complains = [];
        const complaints = await Complain.find({status:"Pending"});
        for (let complaint of complaints) {
            try {
                // const user = await Student.findById(complaint.user);
                // console.log(user.name);
                // if (user) {
                //     complaint.name = user.name;
                //     console.log(complaint);
                    complains.push(complaint);
                // } else {
                //     console.log(`User not found for complaint: ${complaint._id}`);
                // }
            } catch (error) {
                console.error(`Error while finding user for complaint: ${complaint._id}`, error);
            }
        }
        
        if (complains.length > 0) {
            res.send(complains);
        } else {
            res.send({ message: "No complains found" });
        }
    } catch (err) {
        console.error("Error while fetching complaints:", err);
        res.status(500).json({ message: "Server Error" });
    }
};
const Completedsrs = async (req, res) => {
    try {
        const { _id } = req.params;

      const completedComplains = await Complain.find({id}).populate('user', 'name');
      res.json(completedComplains);
    } catch (error) {
      console.error('Error fetching completed complains:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
//   module.exports = { getCompletedComplains };
  
const updateComplainStatus = async (req, res) => {
    try {
      const { complainId } = req.params;
      const { status } = req.body;
      
      // Update the status in the database
      await Complain.findByIdAndUpdate(complainId, { status }, { new: true });
      
      res.json({ message: 'Complain status updated successfully' });
    } catch (error) {
      console.error('Error updating complain status:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
//   module.exports = { };
  


module.exports = { updateComplainStatus ,complainCreate, complainList, Completedsrs };
