const filterGroupList = groups => {
  return groups.filter(group => group.administrator === true);
};

export default Group = {
  filterGroupList,
};
