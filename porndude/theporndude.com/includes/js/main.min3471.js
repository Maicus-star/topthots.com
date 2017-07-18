/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function(factory){if(typeof define==='function'&&define.amd){define(['jquery'],factory);}else{factory(jQuery);}}(function($){var pluses=/\+/g;function decode(s){if(config.raw){return s;}
return decodeURIComponent(s.replace(pluses,' '));}
function decodeAndParse(s){if(s.indexOf('"')===0){s=s.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,'\\');}
s=decode(s);try{return config.json?JSON.parse(s):s;}catch(e){}}
var config=$.cookie=function(key,value,options){if(value!==undefined){options=$.extend({},config.defaults,options);if(typeof options.expires==='number'){var days=options.expires,t=options.expires=new Date();t.setDate(t.getDate()+days);}
value=config.json?JSON.stringify(value):String(value);return(document.cookie=[config.raw?key:encodeURIComponent(key),'=',config.raw?value:encodeURIComponent(value),options.expires?'; expires='+options.expires.toUTCString():'',options.path?'; path='+options.path:'',options.domain?'; domain='+options.domain:'',options.secure?'; secure':''].join(''));}
var cookies=document.cookie.split('; ');var result=key?undefined:{};for(var i=0,l=cookies.length;i<l;i++){var parts=cookies[i].split('=');var name=decode(parts.shift());var cookie=parts.join('=');if(key&&key===name){result=decodeAndParse(cookie);break;}
if(!key){result[name]=decodeAndParse(cookie);}}
return result;};config.defaults={};$.removeCookie=function(key,options){if($.cookie(key)!==undefined){$.cookie(key,'',$.extend({},options,{expires:-1}));return true;}
return false;};}));
function toggleMobileMenuVisibility()
{$(".mobile_menu").on("click",function(){$("#mobile_category_menu").toggle();});}
function goUpArrowAnimation()
{$(function(){$(window).scroll(function(){if($(this).scrollTop()>100){$('.go_up').fadeIn();}else{$('.go_up').fadeOut();}});$('.go_up').on("click",function(){$('body,html').animate({scrollTop:0},800);return false;});});}
function range(start,length,step)
{step=(typeof step!=='undefined')?step:1;var array=[];for(var index=start;index<=length;index+=step){array.push(index);}
return array;}
function headerQuoteSelector()
{if($(".quote").get(0)){var number=$(".quote").find('div').length;var randNum=Math.floor((Math.random()*number)+1);$(".quote div").eq(randNum-1).show();}}
function toggleReviewIconHover()
{$("#main_container .category-wrapper li").hover(function(){$(this).find(".review").show();$(this).find('.position_changed').hide();},function(){$(this).find(".review").hide();$(this).find('.position_changed').show();});}
function populateMobileMenu()
{if(typeof ajax_url_path!=='undefined'){$.getJSON(ajax_url_path+'ajax/mobile_menu',function(data){if(data.length>0){var mobile_menu_list=$("<ul />");var mobile_menu_list_count=0;for(category_idx=0;category_idx<data.length;category_idx++){category_link=$("<a/>",{text:data[category_idx].name+" ("+data[category_idx].link_count+")",href:data[category_idx].link});category_menu_item_span=$("<span class='mobile_category_name' />");category_menu_item_span.append(category_link);if(data[category_idx].links.length>0){category_links_html=$("<div class='mobile_link_icons' />");for(link_idx=0;link_idx<data[category_idx].links.length;link_idx++){category_links_html.append("<a href='"+
data[category_idx].links[link_idx].single_path+"'><span class='micon "+
data[category_idx].links[link_idx].favicon+"'></span></a>");}
category_menu_item_span.append(category_links_html);}
mobile_menu_list_item=$("<li />");mobile_menu_list_item.append(category_menu_item_span);mobile_menu_list.append(mobile_menu_list_item);++mobile_menu_list_count;}
if(mobile_menu_list_count>0){$("#mobile_menu_list").html(mobile_menu_list);}}})}}
function loadMobileCategoryData()
{var can_wrap=true;var can_unwrap=true;function unwrapBlocks(){$('.category-container').unwrap();$('#main_container').addClass('flex');can_unwrap=false;can_wrap=true;}
function wrapBlocks(){$('[data-column="1"]').wrapAll("<div class='column1 col-md-3' />");$('[data-column="2"]').wrapAll("<div class='column2 col-md-3' />");$('[data-column="3"]').wrapAll("<div class='column3 col-md-3' />");$('[data-column="4"]').wrapAll("<div class='column4 col-md-3' />");$('#main_container').removeClass('flex');can_unwrap=true;can_wrap=false;}
if(window.innerWidth<=768){unwrapBlocks();}else{can_wrap=false;}
$(window).on("resize",function(){if(window.innerWidth>768){if(can_wrap){wrapBlocks();}}else{if(can_unwrap){unwrapBlocks();}}});}
function linkPageRating(basepath)
{basepath=basepath.replace(/\/+$/,'/');basepath=basepath.replace(/\/$/,'')+'/';$("#rating .rating").hover(function(){var i=$(this).index();$("#rating .rating").addClass("rateon_forced_off");for(x=0;x<i+1;x++){$("#rating .rating:eq("+x+")").removeClass("rateon_forced_off")
$("#rating .rating:eq("+x+")").addClass("rateon_forced")}},function(){var i=$(this).index();$("#rating .rating").removeClass("rateon_forced").removeClass("rateon_forced_off")});$("#rating .rating").on("click",function(){var i=$(this).index();$.get(basepath+"vote/"+parseInt($("#link_id").html()),function(data){if(data.status=='success'){$("#link-rating-msg").html(data.message).show();setTimeout(function(){$("#link-rating-msg").slideUp().html('');},5000);}else{$("#link-rating-msg").html(data.message)
if($("#link-rating-msg").is(":hidden")){$("#link-rating-msg").show();setTimeout(function(){$("#link-rating-msg").slideUp().html('');},5000);}}},"json");});}
function linkInitSearch(lang,vm,algo_index)
{var $block_result=$('[data-block-results]');var $btn_close=$('[data-btn-close]');var $search_field=$('[name="index-search-form"]');var $active_blocks=$('#search_input, [data-block-results]');var clicked_link=false;$('body').on('click','[data-block-results] .url_link_container a',function(){var keyword=$search_field.val().toLowerCase();_gaq.push(['_trackEvent','happy search','search',keyword]);_gaq.push(['_trackPageview','?q='+keyword]);clicked_link=true;});function showResults(){$block_result.show();$btn_close.show();$active_blocks.addClass('transform-translate');$('body').addClass('visibility-hidden');}
function hideResults(){var search_value=$search_field.val().toLowerCase();if(search_value.length>1){if(clicked_link==false){_gaq.push(['_trackEvent','sad search','search',search_value]);}
clicked_link=false;}
$btn_close.hide();$search_field.val('');$block_result.hide();$active_blocks.removeClass('transform-translate');$('body').removeClass('visibility-hidden');}
$search_field.on('input',function(){var chars=$(this).val().length;if(chars>1){linkSearchQuery(lang,vm,algo_index,$(this).val());showResults();}else if(chars==0){hideResults();}});$btn_close.on('click',function(){hideResults();});$(document).on('click',function(event){if(!$(event.target).closest($active_blocks).length){if($block_result.is(":visible")){hideResults();}}});}
function linkLoadResults(vm_search_block,term,pages,per_page,total_results,links)
{vm_search_block.updateLinks(links);vm_search_block.updatePages(pages);vm_search_block.updateResults(total_results);vm_search_block.setTerm(term);vm_search_block.setPerPage(per_page);vm_search_block.enableLinks();vm_search_block.enablePagination();$(".results-content img.lazyloaded").removeClass("lazyloaded").addClass("lazyload");}
function linkSearchQuery(lang,vm,index,term,page)
{if($.trim(term).length<2)return;page=(typeof page!=='undefined')?parseInt(page):0;index.search({page:page,query:$.trim(term),facetFilters:['languages.'+lang+':'+lang]}).then(function(content,err){var c_pages=content.nbPages<=1?[]:range(1,content.nbPages);var c_objects=[];var c_results=content.nbHits;var c_items_per_page=content.hitsPerPage;if(content.hits.length>0){for(oindex=0;oindex<content.hits.length;oindex++){var title=$.trim(content.hits[oindex].titles['title_'+lang]).length<=0?content.hits[oindex].titles['title_en']:content.hits[oindex].titles['title_'+lang];var thumbnail=content.hits[oindex].thumbnail===null||$.trim(content.hits[oindex].thumbnail).length===0?'default.png':content.hits[oindex].thumbnail;var category_title=$.trim(content.hits[oindex].category.titles['title_'+lang]).length<=0?content.hits[oindex].category.titles['title_en']:content.hits[oindex].category.titles['title_'+lang];var path=content.hits[oindex].paths[lang].length?content.hits[oindex].paths[lang]:content.hits[oindex].paths['en']
var link_order=(typeof content.hits[oindex].lang_order[lang])!="undefined"?content.hits[oindex].lang_order[lang]:content.hits[oindex].order;c_objects.push({id:content.hits[oindex].objectID,path:path,slug:content.hits[oindex].single_slug,title:title,order:link_order,thumbnail:thumbnail,category_slug:content.hits[oindex].category.slug,category_title:category_title,category_title_original:content.hits[oindex].category.titles['title_en'],mobile_friendly:content.hits[oindex].mobile_friendly})}}
linkLoadResults(vm,term,c_pages,c_items_per_page,c_results,c_objects);});}
function linkSearchViewModel(lang,algo_index)
{var vm=new Vue({el:"#search-results-block",data:{term:null,links:[],pages:[],results:0,per_page:20,current_page:1,disable_pages:true,disabled_links:true,vm:null},methods:{setTerm:function(term){this.term=term;},setPerPage:function(total){this.per_page=total;},updateResults:function(total){this.results=total;},updateLinks:function(links){this.links=links;},updatePages:function(pages){this.pages=pages;},enableLinks:function(){this.disabled_links=this.links.length<=0;},enablePagination:function(){this.disable_pages=this.pages.length<=1;},pagination:function(page){this.current_page=page;linkSearchQuery(lang,this.vm,algo_index,this.term,page-1);$(window).scrollTop($("#search-results-block").offset().top);},setVM:function(vm){this.vm=vm;}}});vm.setVM(vm);return vm;}