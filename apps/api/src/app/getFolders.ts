export default (req, res) => {
  const folders = [
    'Cars',
    'Cars/Sport/Porsche/911',
    'Cars/Sport/Porsche/Panamera',
    'Cars/Sport/Porsche/Taycan',
    'Cars/Sport/Ferrari/488 GTB',
    'Cars/Sport/Ferrari/F8 Spider',
    'Cars/Sport/Ferrari/Roma',
    'Cars/Sport/Lamborghini/Aventador',
    'Cars/Sport/Lamborghini/Huracán',
    'Cars/SUV/Toyota/C-HR',
    'Cars/SUV/Toyota/Rush',
    'Cars/SUV/Subaru/Rush',
    'Bikes/Sport/Ducati/Superleggera V4',
    'Bikes/Sport/Ducati/',
    'Bikes/Off Road/Ducati/Hypermotard 950 RVE',
    'Bikes/Off Road/Ducati/Hypermotard 950 RVE',
    'Bikes/Naked/Ducati/Diavel 1260',
  ];

  res.send(folders);
};
