let d = new Date();

export const times = {
     date : d.getDate(),
     day : d.toLocaleString("default", {weekday: 'long'}),
     month : d.toLocaleString("default", {month: 'long'}),
     year : d.getFullYear()
}