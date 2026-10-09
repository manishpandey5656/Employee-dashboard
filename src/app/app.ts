
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KeyValuePipe } from '@angular/common';
import { ChildComponent } from './child-component/child-component';

@Component({
  selector: 'app-root',
  imports: [FormsModule,KeyValuePipe,ChildComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  

  // Employee list
 employees = [
  {
    id: 101,
    name: 'Manish',
    age: 25,
    department: 'IT',
    isActive: true,
    firstName: 'Manish',
    middleName: '',
    lastName: 'Pandey',
    fatherName: 'Mr. Mahesh ',
    dateOfBirth: '',
    gender: 'Male',
    mobile: '',
    email: '',
    address: '',
    pincode:'',
    city: '',
    state: '',
    profilePicture: ''
  },
  {
    id: 102,
    name: 'Rahul',
    age: 25,
    department: 'HR',
    isActive: false,
    firstName: 'Rahul',
    middleName: '',
    lastName: '',
    fatherName: 'N/A',
    dateOfBirth: '',
    gender: 'Male',
    mobile: '',
    email: '',
    address: '',
    pincode:'',
    city: '',
    state: '',
    profilePicture: ''
  },
  {
    id: 103,
    name: 'Naresh',
    age: 24,
    department: 'Finance',
    isActive: true,
    firstName: 'Naresh',
    middleName: '',
    lastName: '',
    fatherName: 'N/A',
    dateOfBirth: '',
    gender: 'Male',
    mobile: '',
    email: '',
    address: '',
    pincode: '',
    city: '',
    state: '',
    profilePicture: ''
  }
];

  // Dashboard statistics
  get totalEmployees(): number {
    return this.employees.length;
  }

  get activeEmployees(): number {
    return this.employees.filter(emp => emp.isActive).length;
  }

  get inActiveEmployees(): number {
    return this.employees.filter(emp => !emp.isActive).length;
  }

  get totalDepartments(): number {
    return new Set(
      this.employees.map(emp => emp.department)
    ).size;
  }

  // Form visibility
  showAddForm = false;

  // Employee currently being edited
  editingEmployeeId: number | null = null;

  // Form data
  newEmployee = {
    name: '',
    age: null as number | null,
    department: '',
    firstName: '',
    middleName: '',
    lastName: '',
    fatherName: '',
    dateOfBirth: '',
    gender:'',
    mobile: '',
    email: '',
    address:'',
    pincode:'',
    city:'',
    state:'',
    profilePicture: ''
  };

  // Add or update employee
  addEmployee(): void {
    const name = this.newEmployee.name.trim();
    const age = Number(this.newEmployee.age);
    const department = this.newEmployee.department;
    const firstName = this.newEmployee.firstName.trim();
    const lastName = this.newEmployee.lastName.trim();
    const fatherName = this.newEmployee.fatherName.trim();
    const dateOfBirth = this.newEmployee.dateOfBirth;
    const gender = this.newEmployee.gender;
    const mobile = this.newEmployee.mobile.trim();
    const email = this.newEmployee.email.trim();
    const address = this.newEmployee.address.trim();
    const city = this.newEmployee.city;
    const state = this.newEmployee.state;
    const middleName = this.newEmployee.middleName.trim();
    const pincode = this.newEmployee.pincode;

    // Validate form
    if (
      !name.trim() ||
      !firstName.trim() ||
      !lastName.trim() ||
      !fatherName.trim() ||
      !dateOfBirth ||
      !gender.trim() ||
      !mobile.trim() ||
      !email.trim() ||
      !address.trim() ||
      !city||
      !state ||
      !Number.isInteger(age) ||
      age < 18 ||
      age > 100 ||
      !department 
    ) {
      alert(
'Please fill in all required fields correctly.'
      );
      return;
    }
    // name validation
    const nameErrorMsg  = 'Name can only contain letters and spaces.';
    const namePattern = /^[A-Za-z\s]+$/;
    if(!namePattern.test(firstName) ){
      alert(nameErrorMsg);
      return;
    }
     if(!namePattern.test(lastName) ){
      alert(nameErrorMsg);
      return;
    }
     if(!namePattern.test(middleName) ){
      alert(nameErrorMsg);
      return;
    }
     if(!namePattern.test(fatherName) ){
      alert(nameErrorMsg);
      return;
    }
// age validation
if(!Number.isInteger(age) || 
age<18 ||age>100){
  alert('Age must be a valid integer between 18 and 100.');
  return;

}
//mobile validation
const mobilePattern = /^\d{10}$/;
if(!mobilePattern.test(mobile)){
  alert('Mobile number must be a valid 10-digit number.');
  return;
}
// pincode validation
const pincodePattern = /^\d{6}$/;
if(!pincodePattern.test(pincode)){
  alert('Pincode must be a valid 6-digit number.');
  return;
}
     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
          alert('Please enter a valid email address.');
          return;
}

    // Update existing employee
    if (this.editingEmployeeId !== null) {
      this.employees = this.employees.map(emp =>
        emp.id === this.editingEmployeeId
          ? {
              ...emp,
          name,
          age,

          department,
          firstName: this.newEmployee.firstName,
          middleName: this.newEmployee.middleName,
          lastName: this.newEmployee.lastName,
          fatherName: this.newEmployee.fatherName,
          dateOfBirth: this.newEmployee.dateOfBirth,
          gender: this.newEmployee.gender,
          mobile: this.newEmployee.mobile,
          email: this.newEmployee.email,
          address: this.newEmployee.address,
          pincode: this.newEmployee.pincode,
          city: this.newEmployee.city,
          state: this.newEmployee.state,
          profilePicture: this.newEmployee.profilePicture
            }
          : emp
      );
    } else {
      // Add new employee
      const nextId =
        Math.max(100, ...this.employees.map(emp => emp.id)) + 1;

      this.employees.push({
  id: nextId,
  name,
  age,
  department,
  isActive: true,
  firstName: this.newEmployee.firstName,
  middleName: this.newEmployee.middleName,
  lastName:this.newEmployee.lastName,
  fatherName: this.newEmployee.fatherName,
  dateOfBirth: this.newEmployee.dateOfBirth,
  gender: this.newEmployee.gender,
  mobile: this.newEmployee.mobile,
  email: this.newEmployee.email,
  address: this.newEmployee.address,
  pincode: this.newEmployee.pincode,
  city: this.newEmployee.city,
  state: this.newEmployee.state,
  profilePicture: this.newEmployee.profilePicture
});
    }

    // Reset form after saving
    this.resetEmployeeForm();
  }

  // Reset form and close it
  resetEmployeeForm(): void {
    this.newEmployee = {
      name: '',
      age: null,
      department: '',
      firstName: '',
      middleName: '',
      lastName: '',
      fatherName: '',
      dateOfBirth: '',
      gender:'',
      mobile: '',
      email: '',
      address:'',
      pincode :'',
      city:'',
      state:'',
      profilePicture: ''

    };

    this.editingEmployeeId = null;
    this.showAddForm = false;
  }

  // Cancel add or edit
  cancelAdd(): void {
    this.resetEmployeeForm();
  }

  // Delete employee
  deleteEmployee(id: number): void {
    const confirmed = confirm(
      'Are you sure you want to delete this employee?'
    );

    if (!confirmed) {
      return;
    }

    this.employees = this.employees.filter(
      emp => emp.id !== id
    );

    // Close and reset form if the deleted employee was being edited
    if (this.editingEmployeeId === id) {
      this.resetEmployeeForm();
    }
  }

  // Load employee details into the form for editing
  editEmployee(id: number): void {
    const employee = this.employees.find(
      emp => emp.id === id
    );

    if (!employee) {
      return;
    }

    this.editingEmployeeId = employee.id;

    this.newEmployee = {
      name: employee.name,
      age: employee.age,
      department: employee.department,
      firstName: employee.firstName,
      middleName: employee.middleName,
      lastName: employee.lastName,
      fatherName: employee.fatherName,
      dateOfBirth: employee.dateOfBirth,
      gender: employee.gender,
      mobile: employee.mobile,
      email: employee.email,
      address: employee.address,
      pincode:employee.pincode,
      city: employee.city,
      state: employee.state,
      profilePicture: employee.profilePicture
};
      
    

    this.showAddForm = true;
  }
  // Search input value
searchText = '';

// Filter employees by name, ID, or department
get filteredEmployees() {

  const search = this.searchText.trim().toLowerCase();

  return this.employees.filter(emp => {

    const matchesSearch =
      !search ||
      emp.name.toLowerCase().includes(search) ||
      emp.id.toString().includes(search) ||
      emp.department.toLowerCase().includes(search);

    const matchesDepartment =
      !this.selectedDepartment ||
      emp.department === this.selectedDepartment;

    return matchesSearch && matchesDepartment;
  });
}
startAddEmployee(): void {
 this.resetEmployeeForm();
  this.showAddForm = true;
}
selectedDepartment = '';


// ProfilePicture SElction Method
onProfilePictureSelected(event: Event): void{
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if(!file){
    return;
  }
  //check that the selected file is an image
  if(!file.type.startsWith('image/')){
    alert('please select a valid image file');
    input.value = '';
    return;
  }
  // limit image size
    if (file.size > 5 * 1024 * 1024) {
    alert('Image size must be less than 5 MB.');
    input.value = '';
    return;
  }
   const reader = new FileReader();

reader.onload = () => {
    if (typeof reader.result === 'string') {
      this.newEmployee.profilePicture = reader.result;
    }
  };

  reader.onerror = () => {
    alert('Unable to load the selected image.');
  };

  reader.readAsDataURL(file);
}
 

// State-wise city list
citiesByState: { [state: string]: string[] } = {
  'Jharkhand': [
    'Dhanbad',
    'Ranchi',
    'Bokaro',
    'Jamshedpur',
    'Deoghar',
    'Hazaribagh',
    'Giridih',
    'Dumka'
  ],

  'Bihar': [
    'Patna',
    'Gaya',
    'Muzaffarpur',
    'Bhagalpur',
    'Darbhanga',
    'Purnia',
    'Ara',
    'Begusarai'
  ],

  'Madhya Pradesh': [
    'Bhopal',
    'Indore',
    'Jabalpur',
    'Gwalior',
    'Ujjain',
    'Sagar',
    'Rewa',
    'Satna'
  ],

  'West Bengal': [
    'Kolkata',
    'Howrah',
    'Durgapur',
    'Asansol',
    'Siliguri',
    'Darjeeling',
    'Bardhaman',
    'Kharagpur'
  ],

  'Uttar Pradesh': [
    'Lucknow',
    'Kanpur',
    'Varanasi',
    'Agra',
    'Prayagraj',
    'Ghaziabad',
    'Noida',
    'Meerut'
  ],

  'Maharashtra': [
    'Mumbai',
    'Pune',
    'Nagpur',
    'Nashik',
    'Thane',
    'Chhatrapati Sambhajinagar',
    'Kolhapur',
    'Solapur'
  ],

  'Rajasthan': [
    'Jaipur',
    'Jodhpur',
    'Udaipur',
    'Kota',
    'Ajmer',
    'Bikaner',
    'Alwar',
    'Bharatpur'
  ],

  'Gujarat': [
    'Ahmedabad',
    'Surat',
    'Vadodara',
    'Rajkot',
    'Gandhinagar',
    'Bhavnagar',
    'Jamnagar',
    'Junagadh'
  ],

  'Karnataka': [
    'Bengaluru',
    'Mysuru',
    'Mangaluru',
    'Hubballi',
    'Belagavi',
    'Kalaburagi',
    'Davanagere',
    'Shivamogga'
  ],

  'Tamil Nadu': [
    'Chennai',
    'Coimbatore',
    'Madurai',
    'Tiruchirappalli',
    'Salem',
    'Tiruppur',
    'Erode',
    'Vellore'
  ],

  'Delhi': [
    'New Delhi',
    'Dwarka',
    'Rohini',
    'Saket',
    'Karol Bagh'
  ]
};

// Available cities for the currently selected state
get availableCities(): string[] {
  return this.citiesByState[this.newEmployee.state] ?? [];
}

// Called whenever the state changes
onStateChange(state: string): void {
  this.newEmployee.state = state;
  this.newEmployee.city = '';
}
// leeter validation method
allowedOnlyLetters(
  event: Event,
  field: 'firstName' | 'middleName'| 'lastName' | 'fatherName'|'name'
):void{
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/[^a-zA-Z\s]/g, '');
  this.newEmployee[field] = input.value;

}
// number validation method
allowedOnlyNumbers(
  event: Event,
  field:  'mobile' | 'pincode'
): void {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/[^0-9]/g, '');
  this.newEmployee[field] = input.value;
}
// maxdate 
maxDate: string = new Date().toISOString().split('T')[0];

greet():void{
  alert('Hello, welcome to the Employee Dashboard!');
}
// method to join the name fields
updateEmployeeName(): void {
  this.newEmployee.name = [
    this.newEmployee.firstName,
    this.newEmployee.middleName,
    this.newEmployee.lastName
  ]
    .filter(part => part.trim() !== '')
    .join(' ');
}
 // function to calculate age
calculateAge(): void {
  const dob = this.newEmployee.dateOfBirth;

  if (!dob) {
    this.newEmployee.age = null;
    return;
  }

  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 &&
      today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  this.newEmployee.age = age;
}

}
