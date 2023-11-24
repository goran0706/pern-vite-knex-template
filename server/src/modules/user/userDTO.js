const getUserDTO = ({ password, ...user }) => user; // exclude password

export default getUserDTO;
