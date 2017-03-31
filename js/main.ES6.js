/**
 * Created by Павел on 31.03.2017.
 */
$(document).ready(()=> {
    let testData,
        $testForm = $("<form>").addClass("test-form"),
        formVal = "";

    let testChange = function () {
        $testForm.appendTo("body").submit((event)=> {
            event.preventDefault();
        });
        $("input").on("change", function () {
            if (formVal != $(this).val()){
                if (confirm("Заменить значения?")) {
                    let index = $(this).data("tag-number");
                    testData.tags[index].value = $(this).val();
                    let str = "";
                    str = `Option: ${testData.Option} 
                    tags:[`;
                    testData.tags.forEach((item)=>{
                        str += `
                        {${item.title}: ${item.value}}`;
                    });
                    str += `
                    ]`;
                    alert(str);
                }
            }
            testAppend(testData, $testForm)
            testEdit();
        });
    };

    let testAppend = function (testData, $testForm) {
        $testForm.html("");
        $("<legend>").html(`${testData.Option}`).appendTo($testForm);
        testData.tags.forEach((item, index)=> {
            let $label = $("<label>").html(`<span>${item.title}</span>`);
            $("<input>").attr("disabled", "disabled").data("tag-number", index).val(`${item.value}`)
                .appendTo($label);
            $label.appendTo($testForm);
            $("<button>").html("<i class ='fa fa-edit'>").addClass("edit").appendTo($label);
        });
        testChange();
        testEdit();
    };

    let testEdit = function () {
        $(".edit").click(function (event) {
            event.preventDefault();
            formVal = $(this).siblings("input").removeAttr("disabled").focus().val();
        });
    };

    $.getJSON("test2.json", (data)=> {
        testData = data;
        testAppend(testData, $testForm);
    });
});