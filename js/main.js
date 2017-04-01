"use strict";

/**
 * Created by Павел on 31.03.2017.
 */
$(document).ready(function () {
    var testData = void 0,
        $testForm = $("<form>").addClass("test-form"),
        formVal = "";

    var testChange = function testChange() {
        $testForm.appendTo("body").submit(function (event) {
            event.preventDefault();
        });
        $("input").on("change", function () {
            if (formVal != $(this).val()) {
                if (confirm("Заменить значения?")) {
                    var index = $(this).data("tag-number");
                    testData.tags[index].value = $(this).val();
                    var str = "";
                    str = "Option: " + testData.Option + " \n                    tags:[";
                    testData.tags.forEach(function (item) {
                        str += "\n                        {" + item.title + ": " + item.value + "}";
                    });
                    str += "\n                    ]";
                    alert(str);
                }
            }
            testAppend(testData, $testForm);
            testEdit();
        }).blur(function () {
            $(this).attr("disabled", "disabled");
        });
    };

    var testAppend = function testAppend(testData, $testForm) {
        $testForm.html("");
        $("<legend>").html("" + testData.Option).appendTo($testForm);
        testData.tags.forEach(function (item, index) {
            var $label = $("<label>").html("<span>" + item.title + "</span>");
            $("<input>").attr("disabled", "disabled").data("tag-number", index).val("" + item.value).appendTo($label);
            $label.appendTo($testForm);
            $("<button>").html("<i class ='fa fa-edit'>").addClass("edit").appendTo($label);
        });
        testChange();
        testEdit();
    };

    var testEdit = function testEdit() {
        $(".edit").click(function (event) {
            event.preventDefault();
            formVal = $(this).siblings("input").removeAttr("disabled").focus().val();
        });
    };

    $.getJSON("test2.json", function (data) {
        testData = data;
        testAppend(testData, $testForm);
    });
});