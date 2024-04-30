export const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'Jun', 'July', 'August', 'September', 'October', 'November', 'December'];

export const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const genders = ['Male', 'Female', 'Other'];
export const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const monthOptions = monthNames.map(name => ({
    label: name,
    value: name
}));
export const weekdaysOptions = weekdays.map(name => ({
    label: name,
    value: name
}));
export const genderOptions = genders.map(name => ({
    label: name,
    value: name.toLocaleLowerCase()
}));
export const bloodGroupOptions = bloodGroups.map(name => ({
    label: name,
    value: name
}));