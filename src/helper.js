const format = () => {

  return (
    {
      name: '',
      email: '',
      phone: '',
      studies: [],
      experience: []
    }
  );
}
const studiesFormat = (data, index) => {
  console.log(data)
  return (
    {
      school: `${getData(data.school)}`,
      titleStudy: `${getData(data.titleStudy)}`,
      dateStudy: `${getData(data.dateStudy)}`
    }
  );
}
const ttt = (data) =>{
  
  for (const props in data){


  }
}
const formData = (data) => {
  return (
    {
      name: data.name.value,
      email: data.email.value,
      phone: data.phone.value,
      studies: [{
        school: data.school.value,
        titleStudy: data.titleStudy.value,
        dateStudy: data.dateStudy.value
      }],
      experience: [{
        company: data.company.value,
        position: data.position.value,
        tasks: `${getData(data.tasks)}`,
        startDate: data.startDate.value,
        endDate: data.endDate.value
      }]
    }
  );
}
const setMultipleField = (data) => {
  Object.entries(data).map((field, value) => {

  })
}
const getData = (data) => {
  console.log(typeof data)

  if(typeof data === 'object'){
    return Object.values(data).map((field) => field.value);
  }else{
    return data.value;
  }
}
export { format, studiesFormat, getData };