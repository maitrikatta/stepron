import moment from 'moment/moment';
const data = [
  {
    id: 1,
    fname: 'Yogesh',
    lname: 'Kakde',
    marital: 'Single',
    dob: moment(new Date('1997-05-05')).format('YYYY-MM-DD'),
  },
  {
    id: 2,
    fname: 'Shubham',
    lname: 'Mate',
    marital: 'Divorced',
    dob: moment(new Date('1998-05-09')).format('YYYY-MM-DD'),
  },
  {
    id: 4,
    fname: 'Krushna',
    lname: 'Nale',
    marital: 'Single',
    dob: moment(new Date('1998-03-15')).format('YYYY-MM-DD'),
  },
];

export default data;
