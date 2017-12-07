/**
 * Created by Lin on 2017/12/7.
 */

var data = {

}

var tem = [
    '<div class="row field-{field}">',
    '<div class="col-md-12">',
    '<div class="input-group">',
    '<span class="input-group-addon" data-field="{field}">{field}</span>',
    '<input type="text" class="form-control" placeholder="{field}">',
    '</div></div></div>'
].join('');

$(function(){

    var autoSaveTime = 12000;
    setInterval(save, autoSaveTime);
    initDoc();

    $('.add-field').on('click', '.label', function(){
        var fieldRowList = $(this).parents('.field-container').next('.field-row-list'),
            success = $(this).hasClass('label-success'),
            field = $(this).attr('data-field'),
            fieldRow = tem.replace(/\{field\}/ig, field);
        if(success){
            $(this).removeClass('label-success');
            fieldRowList.find('.field-' + field).remove();
        }else{
            $(this).addClass('label-success');
            fieldRowList.append(fieldRow);
        }
    });

    $('.btn-clean').on('click', function(){
        var fieldRowList = $(this).parents('.field-handler').prev('.field-row-list'),
            row = fieldRowList.find('.row'),
            input = row.find('input');
        input.val('');
    });

    $('.btn-save').on('click', function(){
        save();
    });

});

function save(){
    $('.field-row-list').find('input').each(function(){
        $(this).attr('data-val', this.value);
    });
    localStorage.setItem('saveHTML', document.body.innerHTML);
}

function initDoc(){
    var initHTML= localStorage.getItem('saveHTML');
    if(initHTML){
        document.body.innerHTML = initHTML;
        $('.field-row-list').find('input').each(function(){
            $(this).val($(this).attr('data-val'));
        });
    }
}