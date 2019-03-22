(function ($) {

    /**
     *	 Class dropdownControl
     *	 values - values of the dropdown
     */

    var DropdownExtra = function (DOMElement, values)
    {
        // Constructor method
        this.createDropdownExtra = function () {
            this.values = values;
            this.DOMElement = DOMElement;

            self = this;

            $(this.DOMElement).addClass('dropdown-extra')
            .html(self.createStructure(self, values));

        };

        //create entire structure
        this.createStructure = function(DOMElement, values){
            var active = "";

            if ($(DOMElement).data("open") === "1")
                active = " active ";

            //title
            html = "<div class='dropdown-extra-wrap "+active+"'><span>"+values.text+"</span><i class='fas fa-chevron-right'></i></div>";
            html += "<div class='dropdown-extra-content'>";

            $.each(values.options, function(k,v){
                html += self.createInnerElement(v);
            });

            html += "</div></div>";
            return html;
        }

        this.createInnerElement = function(data){
            var checkboxAttr, inputAttr = "";
            var inputHtml = "";

            $.each(data.checkbox.attributes, function(k,v){
                checkboxAttr += " "+ v.key + "='"+v.value+"' ";
            });

            var isChecked = "";

            if(!(checkboxAttr.indexOf("checked") > -1)){
                isChecked = "disabled='disabled'";
            }

            //create input (text/number/..)
            if(data.input instanceof Array){
                $.each(data.input, function(k,input){
                    inputAttr = "";
                    $.each(input.attributes, function(j,v){
                        inputAttr += " " + v.key + "='"+v.value+"' ";
                    });
                    inputHtml += "<input class='form-control' " + inputAttr + " " +isChecked+">";
                });

            }else{
                $.each(data.input.attributes, function(k,v){
                    inputAttr += " " + v.key + "='"+v.value+"' ";
                });

                inputHtml += "<input class='form-control' " + inputAttr + " " +isChecked+">";
            }

            html = "<div class='input-group mb-1'>"+
                        "<div class='input-group-prepend'>"+
                            "<div class='input-group-text'>"+
                                "<label  class='form-check-label'><input class='check-with-input form-check-input' type='checkbox' " + checkboxAttr + ">"+data.checkbox.label+"</label>"+
                            "</div>"+
                        "</div>"+
                        inputHtml+
                    "</div>";

            return html;
        }

        //// Private methods
        /**
         * Set the list status to "Open"
         */
        this.setOpen = function (element, options) {

        };

        /**
         * Set the list status to "Closed"
         */
        this.setClosed = function (element, options) {


        };

        this.listEvents = {

            click: function (elem) {
                var parentElement = $(elem).parent();
                var $sibling = $($(elem).siblings()[0]);
                var $icon = $($(elem).find("i")[0]);

                $(elem).on("click", function (e) {
                    if(parentElement.data("open") == "1"){
                        $sibling.hide("fast");
                        parentElement.data("open","0");
                        $(elem).trigger("changed", false);
                        $icon.removeClass("fa-rotate-90");
                    }else{
                        $sibling.show("fast");
                        parentElement.data("open","1");
                        $(elem).trigger("changed", true);
                        $icon.addClass("fa-rotate-90");
                    }
                });
            },
            checkboxClick: function (elem) {
                $(elem).on("change", function (e) {
                    var $inputTextElement = $($(this).parent().parent().parent().siblings());
                    if($(this).is(":checked")) {
                        $inputTextElement.prop('disabled', false);
                    }else{
                        $inputTextElement.prop('disabled', true);
                    }
                });
            }
        };

    }; // end of class

    $.fn.DropdownExtra = function (values) {

        var objDropdown = null;

        objDropdown = new DropdownExtra(this, values);
        objDropdown.createDropdownExtra();
        this.data('objDropdown', objDropdown);

        var objTitle = $(objDropdown.DOMElement).find(".dropdown-extra-wrap");
        var objCheckbox = $(objDropdown.DOMElement).find(":checkbox");

        $(objTitle).bind('changed', function(status) { return status; });
        objDropdown.listEvents.click(objTitle);
        objDropdown.listEvents.checkboxClick(objCheckbox);

        return this;
    };


}(jQuery));
