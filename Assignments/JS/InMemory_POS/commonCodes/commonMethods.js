
/* Used for reduce boilerPlate Codes */




/*SweetAlert for saved Successfully*/

function savedSuccessfully() {
    const Toast = Swal.mixin({
        toast:true,
        position: 'bottom-end',
        background:'#0B9F43FF',
        color:'#ffffff',
        showConfirmButton:false,
        timer:3200,
        timerProgressBar:true,
        didOpen : (toast) =>{
            toast.addEventListener('mouseenter',Swal.stopTimer)
            toast.addEventListener('mouseleave',Swal.resumeTimer)
        }
    })
    Toast.fire({
        icon:'success',
        title:'saved successfully'
    })
}

/*SweetAlert for search result not found*/

function searchResultNotFound(){
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        background: '#ff4757',
        color:'#fff',
        showConfirmButton:false,
        timer:3000,
        timerProgressBar:true,
        didOpen: (toast) =>{
            toast.addEventListener('mouseenter',Swal.stopTimer)
            toast.addEventListener('mouseleave',Swal.resumeTimer)
        }
    })
    Toast.fire({
        icon:'error',
        title:"Search Result not Found !"
    })
}
/* Search any Object in arraylist */

function search(id, arrayReferenceName) {
    /*
     * How to use this method ?
     *     -------------------------------------------------------------------------------------->
     *     arrayReferenceName - Enter the reference name of the array you want to select object
     *     id                 - Enter the ID you want to search here.
     *     -------------------------------------------------------------------------------------->
     **/

    for (let i = 0; i < arrayReferenceName.length; i++) {
        if(arrayReferenceName[i].id === id || arrayReferenceName[i].itemCode === id){
            return arrayReferenceName[i];
        }
    }
}
/*Delete Any Object in arrayList*/

function deleteObj(textField, arrayRefNameForDelete){
    /*
     * How to use this method ?
     *     ----------------------------------------------------------------------------------------->
     *     arrayRefNameForDelete - Enter the reference name of the array you want to select object
     *     textField - Enter the ID here in the text field where you type the ID you want to select.
     *     ----------------------------------------------------------------------------------------->
     */
    let SearchResult = search($(textField).val(), arrayRefNameForDelete)
    if(SearchResult != null){

        let indexOfItem =  arrayRefNameForDelete.indexOf(SearchResult);
        arrayRefNameForDelete.splice(indexOfItem , 1);

        //TODO search how to pass method like parameter and remove this waste methods
        /** this two method remove and implement one use ful method */

        loadAllCustomer();
        return true;
    } else {
        return false;
    }
}
/* This is text field clear method */

function clearTextField(txtFld) {
    /*
     *  if you want to clear any kind of text field you can send Its id into this method as a parameter */
    $(txtFld).val('');
}

/* Update Customer*/

function update(textField , arrayRef , fstTxtFld, secondTxtFld,thirdTxtFld, FourthTxtFld) {
    let caughtObj = search($(textField).val(),arrayRef);
    if(caughtObj != null){

        caughtObj.id = $(fstTxtFld).val();
        caughtObj.name = $(secondTxtFld).val();
        caughtObj.address = $(thirdTxtFld).val();
        caughtObj.contact = $(FourthTxtFld).val();

        loadAllCustomer();
        return true;
    }else{
        return false;
    }
}


/* Regular Expression Matcher */

function validator(txtField , regXPattern , warningText , errorLbl, nextTxtField){
    /*
     * How to use this method ?
     *      -------------------------------------------------------------------------->
     *      txtField        -    pass text field if you want to select
     *      regXPattern     -    pass your reg-x pattern here and validate your text
     *      warningText     -    pass your validation error, warning message
     *      errorLbl        -    pass id if you have error label
     *      nextTxtField    -    pass next text field id here
     *      -------------------------------------------------------------------------->
     */

    $(txtField).on('keyup',function (e){

            if(regXPattern.test($(txtField).val())){
                $(txtField).css('border','3px solid green');
                $(errorLbl).text('');

                /*This for Code CustomerManager */
                if(e.key === "Enter" && txtField === "#cusContactTxt"){
                    $(nextTxtField).focus();
                }else if(e.key === "Enter" && txtField === "#cusContactTxt"){
                    saveCustomer();
                    $(nextTxtField).focus();
                } else {
                    return false;
                }
            }else {
                $(txtField).css('border', '3px solid red');
                $(errorLbl).text(warningText);
            }
        }
    )
}

