// let customerDetails = [];
//
// /** SWEAT ALERTS */
//
// /* sweat alert for saved successfully */
// function savedSuccessfully() {
//     const Toast = Swal.mixin({
//         toast: true,
//         position: 'bottom-end',
//         background: '#0B9F43FF',
//         color: '#ffffff',
//         showConfirmButton: false,
//         timer: 3000,
//         timerProgressBar: true,
//         didOpen: (toast) => {
//             toast.addEventListener('mouseenter', Swal.stopTimer)
//             toast.addEventListener('mouseleave', Swal.resumeTimer)
//         }
//     })
//     Toast.fire({
//         icon: 'success',
//         title: 'saved in successfully'
//     })
// }
//
// /* sweat alerts for search result not found */
// function searchResultNotFound() {
//     const Toast = Swal.mixin({
//         toast: true,
//         position: 'bottom-end',
//         background: '#ff4757',
//         color: '#ffffff',
//         showConfirmButton: false,
//         timer: 3000,
//         timerProgressBar: true,
//         didOpen: (toast) => {
//             toast.addEventListener('mouseenter', Swal.stopTimer)
//             toast.addEventListener('mouseleave', Swal.resumeTimer)
//         }
//     })
//     Toast.fire({
//         icon: 'error',
//         title: "search result not found !"
//     })
// }
//
// /** CUSTOMER PAGE OPTIONS  */
//
// /* clear customer details */
// function clearCustomerTextFields() {
//     $('#cusIdTxt,#cusNameTxt,#cusAddressTxt,#cusContactTxt').val('');
// }
//
// /* load all Customer to table */
// function loadAllCustomer() {
//     /* removing repeating issue */
//     $("#customerTableBody").empty();
//
//     for (let i of customerDetails) {
//         let row = `<tr><td>${i.id}</td><td>${i.name}</td><td>${i.address}</td><td>${i.contact}</td></tr>`;
//         $('#customerTableBody').append(row);
//     }
// }
//
// /* disabling tab */
// $('#cusNameTxt,#cusAddressTxt,#cusContactTxt,#cusIdTxt').on('keydown', function (e) {
//     if (e.key === "Tab") {
//         e.preventDefault()
//     }
// })
//
// /* save customer option */
// function saveCustomer() {
//
//
//     /* packing customer details into customerObject */
//     let customerObject = {
//         id: $('#cusIdTxt').val(),
//         name: $('#cusNameTxt').val(),
//         address: $('#cusAddressTxt').val(),
//         contact: $('#cusContactTxt').val()
//     }
//
//     console.log(customerObject.toString())
//
//     clearCustomerTextFields();
//
//
//     /* saved notification for customer */
//     savedSuccessfully();
//
//     /* customerObject adding into customerDetails object holding Array */
//     customerDetails.push(customerObject);
//
//     loadAllCustomer()
// }
//
// /* saving customer object */
// $("#addCustomerBtn").on('click', function () {
//     saveCustomer()
// });
//
// /* search customer */
// function searchByCustomerID(id) {
//     for (let i = 0; i < customerDetails.length; i++) {
//         if (customerDetails[i].id === id) {
//             return customerDetails[i];
//         }
//     }
// }
//
// /* search by pressing enter option in customer form */
// $("#srcCustomerId").on('keydown', function (e) {
//
//     let response = searchByCustomerID($("#srcCustomerId").val());
//     let key = e.which;
//
//     if (key === 13) {
//         if (response) {
//             $("#cusIdTxt").val(response.id);
//             $("#cusNameTxt").val(response.name);
//             $("#cusAddressTxt").val(response.address);
//             $('#cusContactTxt').val(response.contact);
//         } else {
//             clearCustomerTextFields();
//             searchResultNotFound();
//         }
//     }
// });
//
// /* reg-x for customer id text */
// $('#cusIdTxt').on('keyup', function (e) {
//     if (/^(C-)[0-9]{2,4}$/.test($('#cusIdTxt').val())) {
//
//         $('#cusIdTxt').css('border', '3px solid green')
//         $('#customerIdLbl').text('')
//
//         if (e.key === "Enter") {
//             $('#cusNameTxt').focus()
//         }
//
//     } else {
//
//         $('#cusIdTxt').css('border', '3px solid red');
//         $('#customerIdLbl').text("Your input can't be validated, Ex - C-001  ")
//
//     }
// })
//
// /* reg-x for customer name text */
// $('#cusNameTxt').on('keyup', function (e) {
//     if (/^[A-z ]{3,20}$/.test($('#cusNameTxt').val())) {
//
//         $('#cusNameTxt').css('border', '3px solid green')
//         $('#customerNameLbl').text('')
//
//         if (e.key === "Enter") {
//             $('#cusAddressTxt').focus()
//         }
//
//     } else {
//
//         $('#cusNameTxt').css('border', '3px solid red');
//         $('#customerNameLbl').text("Your input can't be validated, Ex - Mahesh  ")
//     }
// })
//
// /* reg-x for customer address text */
// $('#cusAddressTxt').on('keyup', function (e) {
//     if (/^[A-z ]{4,20}$/.test($('#cusAddressTxt').val())) {
//
//         $('#cusAddressTxt').css('border', '3px solid green')
//         $('#customerAddressLbl').text('')
//
//         if (e.key === "Enter") {
//             $('#cusContactTxt').focus()
//         }
//
//     } else {
//
//         $('#cusAddressTxt').css('border', '3px solid red');
//         $('#customerAddressLbl').text("Your input can't be validated, Ex - Galle ")
//     }
// })
//
// /* reg-x for customer contact text */
// $('#cusContactTxt').on('keyup', function (e) {
//     if (/^([0-9]{10})$/.test($('#cusContactTxt').val())) {
//
//         $('#cusContactTxt').css('border', '3px solid green')
//         $('#CustomerContactLbl').text('')
//
//         if (e.key === "Enter") {
//             saveCustomer()
//             $('#cusIdTxt').focus()
//         }
//     } else {
//
//         $('#cusContactTxt').css('border', '3px solid red');
//         $('#CustomerContactLbl').text("Your input can't be validated, Ex - 0719028827 ")
//     }
// })
//
// /* auto generating id for customer  */