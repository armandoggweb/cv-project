const format = (data, name) => {
  if (name === 'personal') {
    const { userName, email, phone } = data;
    return ({
      userName: userName.value,
      email: email.value,
      phone: phone.value,
      submitted: true
    });
  } else if (name === 'studies') {
    const { school, titleStudy, dateStudy } = data;
    return ({
      school: school.value,
      titleStudy: titleStudy.value,
      dateStudy: dateStudy.value,
      submitted: true
    });
  } else if (name === 'experience') {
    const { company, position, tasks, startDate, endDate } = data;
    return ({
      company: company.value,
      position: position.value,
      tasks: getData(tasks),
      startDate: startDate.value,
      endDate: endDate.value,
      submitted: true
    });
  }
}

const getData = (data) => {
  if (typeof data === 'object') {
    const inputs = Object.values(data).filter((input) => input.value && input.value !== '');
    return inputs.map((input) => input.value);
  } else {
    return [];
  }
}
export { format };