<template>
<div :class="[otherName,'ui-search-form']">
    <div :class="[className,'search-status']">
        <div class="search-filter" v-show="this.searchFilter" >
            <span class="filter-container"  @mouseenter="selectShow" @mouseleave="selectHide">
                <span class="search-name" >{{searchLabel}}</span>
                <em class="icon-return1"></em>
            </span>
            <ul :class="ulClass" @mouseenter="selectShow" @mouseleave="selectHide">
                <li 
                    class="" 
                    @click="getValue(item,index)" 
                    v-for="(item, index) in searchFilter"
                    :key="index"
                >
                    {{item.label}}
                </li>
            </ul>
        </div>
        <div class="search-content">
            <input
                ref="searchInput"
                type="text" 
                v-model="searchValue"
                autoComplete="off" 
                class="search-val" 
                :placeholder="[placeholder?placeholder:'请输入搜索关键字']" 
                :name="[inputName?inputName:'search']" 
				v-on:input ="inputChange"
            />
        </div>
    </div>
    <!-- <span :class="[flag?'click':'','icon-searching']" @click="onSearch"></span> -->
</div>
</template>

<script>
 /**
	 *  @param {String} placeholder  提示文案
     *  @param {String} inputName  单一搜索框的name名
     *  @param {Array} searchFilter 下拉搜索框的options,是多选是必填
	 *  @param {Function} onSubmit 提交函数
	*/
export default {
    props:{
        placeholder:String,
        inputName:String,
        searchFilter:Array,
        onSubmit:Function
    },
    data(){
        return{
           className:'',
           otherName:'',
		   flag:false,
		   
           ulClass:'',
           searchLabel:'',
           filterValue:'',
		   searchValue:'',
		   inputValue : ''
        }  
    },
    created(){
        if(this.searchFilter){
			this.searchLabel=this.searchFilter[0].label;
			this.filterValue=this.searchFilter[0].value;
        }
	},
	mounted(){
		this.onSearch();
	},
    methods:{
        onSearch(){
            if(!this.flag){
                if(this.searchFilter){
                    this.otherName="renderFilter";
					this.className = "filter-show-form";
				}else{
                    this.otherName='';
                    this.className = "show-form";
				}
				this.flag=true;
            }else{
               var value={};;
                if(this.filterValue){
					value[this.filterValue]=this.searchValue
                }else{
                    value.content=this.searchValue;
                }   
                this.onSubmit && this.onSubmit(value); 
               
			}
           
        },
        getValue(item){
            this.searchLabel=item.label ;
            this.filterValue=item.value;
			this.ulClass="";
			
			var param = {searchFilter :this.filterValue ,searchValue :this.inputValue}
			this.$emit("changeSearchFormData",param)
            
        },
        selectShow(){
            this.ulClass="show-li";
        },
        selectHide(){
             this.ulClass="";
		},
		inputChange(e){
			

			this.inputValue = e.target.value;
			var param = {searchFilter :this.filterValue ,searchValue :this.inputValue}
			this.$emit("changeSearchFormData",param)
		}
    }
}
</script>

<style lang="less">

.ui-search-form{
	height: 30px;
	border-left: 1px solid #eee;
	border-right: 1px solid #eee;
	padding:0 10px;
    padding-left: 0;
    float: right;
	text-align: left;
	font-size: 14px;
	div{
		display: inline-block;
		vertical-align: top;
	}

	
	.search-val{
		border:none;
		// border-left: 1px solid #ccc;
		padding-left: 10px;
		font-size: 14px;
		width: 0;
		&:focus {outline: none;}
	}
	.icon-searching{
		z-index: 10;
		font-size: 20px;
		line-height: 30px;
		color: #d4dce2;
		float: right;
		margin-left: 10px;
		cursor: pointer;
		&:hover{
			color:#499df1;
		}
	}
	.click{
		color: #499df1;
	}
	.search-name{
		margin-left: 10px;
		font-size: 14px;
		display: inline-block;
		text-align: left;
		&:hover{
			color: #2980b9;
		}
	}
	.search-filter,.search-content,.filter-container{
		width: 0;
	}
	.filter-container{
		
		border-right: 1px solid #eee;
		display: inline-block;
		color:#666666;
		line-height: 30px;
		em{
			vertical-align: middle;
			color: #666666;
			margin-left: 5px;
		}
	}

	.search-status{
		z-index: 1;
		height: 30px;
		line-height: 30px;
		visibility: hidden;
		width: 0;
		ul{
			left: 0;
			padding: 0;
			margin: 0;
			height: 0;
			z-index: 99;
			top: 0px;
			visibility: hidden;
			position: relative;
			box-shadow: 0 1px 6px #7d7d7d;
			padding:8px 0;
			border-radius: 4px;
			background-color: #fff;
			&:before{
				content:'';
				border:6px solid transparent;
				border-bottom-color:rgba(125,125,125,.3);
				position: absolute;
				height: 0;
				width: 0;
				top: -12px;
				left: 50%;
				transform:translateX(-50%);

			}
			&:after{
				content:'';
				border:6px solid transparent;
				border-bottom-color:#fff;
				position: absolute;
				height: 0;
				width: 0;
				top: -11px;
				left: 50%;
				transform:translateX(-50%);

			}

			li{
				padding-left: 10px;
				background-color: #fff;
				color: #666666;
				height: 0;
				cursor: pointer;
				&:hover{
					background-color: #f5f5f5;
				}
            }
            

		}
		.show-li{
			visibility: visible;
			height: auto;
			li{
				height: auto;
			}
		}
	}

	.show-form{
		animation:show .5s forwards;
		animation-iteration-count: 1;
		visibility: visible;
		width:150px;
		.search-filter,.search-val,.search-content{
			width: auto;
		}
		.search-val{
			width: 100%;
		}
		.search-content{
			width: 150px;
		}
		.filter-container{
			width:100px;
		}
		ul{
			width: 100px;
		}
	}
	@keyframes show {
      0% {
         width:0;
         opacity: 0;
      }
      50%{
      	width:150;
        opacity: 0;
      }
      100% {
         width:auto;
         opacity: 1;
      }
    }

}
.renderFilter{
	width: 310px;
	.filter-show-form{
		width: 308px;
		visibility: visible;
		.search-filter,.search-val,.search-content{
			width: auto;
		}
		.search-val{
			width: 100%;
		}
		.search-content{
			width: 207px;
		}
		.filter-container{
			width:100px;
		}
		ul{
			width: 100px;
		}
	}
}
</style>


