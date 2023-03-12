<template>
  <div class="card-container">
    <div class="card-cap">
      <h3>Risk Status</h3>
    </div>
    <div class="card-body">
      <div class="build-header">
        <div class="card-col-sml header"></div>
        <div class="card-col-med header">Category</div>
        <div class="card-col-lg header">Result</div>
        <div class="card-col-med header">Description</div>
        <div class="card-col-med header">Risk Impact</div>
        <div class="card-col-med header">Source</div>
      </div>
      <div class="build-container">
        <div class="card-col-sml status"><span class="build-status" data-build-status="success"></span></div>
        <div class="card-col-med name">Built Age</div>
        <div class="card-col-lg health">{{ buildingAge }}</div>
        <div class="card-col-med duration"></div>
        <div class="card-col-med current-build">No Impact<i class="fa fa-check check-style" aria-hidden="true"></i></div>
        <div class="card-col-med current-build">Paid source</div> 
      </div>
      <div class="build-container">
        <div class="card-col-sml status"><span class="build-status" :data-build-status="floodDataStatus"></span></div>
        <div class="card-col-med name">Flood Risk</div>
        <div class="card-col-lg health">{{floodText}} </div>
        <div class="card-col-med duration">{{floodDesc}}</div>
        <div class="card-col-med">
          <div class="status-bar"><span class="status-value" :style="floodBar"></span></div>
        </div>
        <div class="card-col-med">checkmyfloodrisk.co.uk</div> 
      </div>
       <div class="build-container">
        <div class="card-col-sml status"><span class="build-status" :data-build-status="listedStatus"></span></div>
        <div class="card-col-med name">Listed Building</div>
        <div class="card-col-lg health">
          <div v-if="listed.isListed" >Listed<i class="fa fa-check" style="color: #ed4949" aria-hidden="true"></i></div>
          <p v-else>Unlisted Building</p>
          </div>
        <div class="card-col-med duration">{{listedGrade}}</div>
        <div class="card-col-med current-build">{{listedLink}}</div> 
        <div class="card-col-med">Historic England</div> 
      </div>
      <div class="build-container">
        <div class="card-col-sml status"><span class="build-status" :data-build-status="ageStatus"></span></div>
        <div class="card-col-med name">Company Age</div>
        <div class="card-col-lg health">{{this.company.date_of_creation}}</div>
        <div class="card-col-med duration"><span class="build-health" :data-build-health="ageHealth"></span></div>
        <div class="card-col-med current-build"></div>
        <div class="card-col-med">Companies House</div> 
      </div>
      <div class="build-container">
        <div class="card-col-sml status"><span class="build-status" data-build-status="pending"></span></div>
        <div class="card-col-med name">Company Activity</div>
        <div class="card-col-lg health">Company has a lot of major changes</div>
        <div class="card-col-med duration">Less major filings at company house</div>
        <div class="card-col-med">
          <div class="status-bar"><span class="status-value" style="width: 60.993%;"></span></div>
        </div>
          <div class="card-col-med">Companies House</div> 
      </div>
      <div class="build-container">
        <div class="card-col-sml status"><span class="build-status" data-build-status="pending"></span></div>
        <div class="card-col-med name">Company Address</div>
        <div class="card-col-lg health">        <p class="pnospace"
          v-for="(line, index) in company.registered_office_address"
          v-bind:key="index"
        >
          {{ line }}
        </p></div>
        <div class="card-col-med duration"></div>
        <div class="card-col-med">No Impact<i class="fa fa-check check-style" aria-hidden="true"></i></div>
        <div class="card-col-med">Companies House</div> 
      </div>
      <div class="build-container">
        <div class="card-col-sml status"><span class="build-status" data-build-status="success"></span></div>
        <div class="card-col-med name">Property Address</div>
        <div class="card-col-lg health"> {{ address.summaryline }}</div>
        <div class="card-col-med duration"></div>
        <div class="card-col-med">No Impact<i class="fa fa-check check-style" aria-hidden="true"></i></div>
        <div class="card-col-med">Right Move</div> 
      </div>
      <div class="build-container">
        <div class="card-col-sml status"><span class="build-status" data-build-status="success"></span></div>
        <div class="card-col-med name">Pictures        </div>
        <div class="card-col-lg health"> <carousel :per-page="1" :navigationEnabled="true"
         :paginationEnabled="false">
    <slide v-for="(image, index) in propertyInfo.thumbnailPhotos" :key="index">
                <img class="car-image" :src="image.url" :alt="image.name" />
    </slide>
  </carousel></div>
        <div class="card-col-med duration">        
          Bedrooms: {{ propertyInfo.bedrooms }} |
          Value: £{{ propertyInfo.price }} |  
          Type: {{ propertyInfo.propertyType }}
        </div>
        <div class="card-col-med">No Impact<i class="fa fa-check check-style" aria-hidden="true"></i></div>
        <div class="card-col-med">Right Move</div> 
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

import { mapState } from 'vuex'

export default {
  components: { 
    Carousel,
    Slide
  
  
  },
  computed: {
    ...mapState([
      'address',
      'buildingAge',
      'listed',
      'floodData',
      'company',
      'propertyInfo'
    ]),
    listedStatus(){
      return this.listed.isListed ? "success" : "failed";
    },
    listedGrade(){
      return this.listed.isListed ? this.listed.grade : "";
    },
    listedLink(){
      return this.listed.isListed ? this.listed.link : "";
    },
    floodDataStatus(){
      // {VeryLow: 1659, Low: 1198, Medium: 1226, High: 1258}
      console.log("Flood Status", this.floodData)
      if(this.floodData.VeryLow === -1){
          return "pending"
      }


      if (this.floodData.VeryLow <= this.floodData.High &&  this.floodData.VeryLow <= this.floodData.Medium){
        return "success"
      }else{
        if(this.floodData.Medium <= this.floodData.High){
          return "pending"
        }else{

          return "failed"
        }
      }
    },
    floodText(){
      if(this.floodData.VeryLow === -1){
        return "No Data"
      }

      if (this.floodData.VeryLow <= this.floodData.High &&  this.floodData.VeryLow <= this.floodData.Medium){
        return "Low"
      }else{
        if(this.floodData.Medium <= this.floodData.High){
          return "Medium"
        }else{

          return "High"
        }
      }
    },
    floodBar(){
      let dist = 100;
      if (this.floodData.VeryLow <= this.floodData.High &&  this.floodData.VeryLow <= this.floodData.Medium){
        dist = this.floodData.VeryLow / (this.floodData.High + this.floodData.Medium)  * 100
        return `width: ${dist};`
      }else{
        if(this.floodData.Medium <= this.floodData.High){
          
          dist = this.floodData.Medium / (this.floodData.High)  * 100
        }
      }

      if(this.floodData.VeryLow === -1){
          dist =0;
      }
      return `width: ${dist}%;`
    },
    floodDesc(){
      if(this.floodData.VeryLow === -1){
        return "No Data"
      }

      return `High Risk Area ${this.floodData.High}m away`;
    },
    ageStatus(){
      if(this.company.date_of_creation > new Date('2013-05-23')){
          return "failed"
      }else{
        return "success"
      }
    }, 
    ageHealth(){
      if(this.company.date_of_creation > new Date('2018-05-23')){
          return "terrible"
      }else if(this.company.date_of_creation > new Date('2013-05-23')){
          return "bad"
      }else if(this.company.date_of_creation > new Date('2000-05-23')){
          return "good"
      }else{
        return "great"
      }
    }
  }
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500,700);


.card-container {
  box-shadow: 0 4px 10px rgba(50, 50, 50, 0.1);
  margin: 50px auto;
  width: 1000px;
	color: #333;
  font-family: 'Roboto', sans-serif;
}

.card-cap {
  background: #fff;
  border-radius: 2px 2px 0 0;
  color: #595959;
  padding: 20px;
  text-align: center;
}
.card-cap h3 {
  font-size: 16px;
}

.card-body {
  background: #fff;
  border-top: 1px solid #f5f5f5;
  padding: 20px;
}

.card-footer {
  background: #fcfcfc;
  border-radius: 0 0 2px 2px;
  border-top: 1px solid #f5f5f5;
  padding: 20px;
  text-align: right;
}

.build-header {
  background: #f5f5f5;
  border-radius: 3px;
  margin: 50px 0 10px;
  padding: 10px 0;
}
.build-header:first-of-type {
  margin-top: 0;
}

.build-container {
  margin-bottom: 10px;
  padding: 10px 0;
}

.build-container,
.build-header {
  width: 100%;
}
.build-container:after,
.build-header:after {
  clear: both;
  content: "";
  display: table;
}

.build-container .build-status,
.build-header .build-status {
  background: #aaa;
  border-radius: 50%;
  display: inline-block;
  height: 10px;
  margin-left: 10px;
  width: 10px;
}
.build-container .build-status[data-build-status="success"],
.build-header .build-status[data-build-status="success"] {
  background: #20c05c;
}
.build-container .build-status[data-build-status="failed"],
.build-header .build-status[data-build-status="failed"] {
  background: #ed4949;
}
.build-container .build-status[data-build-status="pending"],
.build-header .build-status[data-build-status="pending"] {
  background: #fed42a;
}
.build-container .build-health[data-build-health="great"]:before,
.build-header .build-health[data-build-health="great"]:before {
  content: '\f004 \f004 \f004';
}
.build-container .build-health[data-build-health="good"]:before,
.build-header .build-health[data-build-health="good"]:before {
  content: '\f004 \f004 \f08a';
}
.build-container .build-health[data-build-health="bad"]:before,
.build-header .build-health[data-build-health="bad"]:before {
  content: '\f004 \f08a \f08a';
}
.build-container .build-health[data-build-health="terrible"]:before,
.build-header .build-health[data-build-health="terrible"]:before {
  content: '\f08a \f08a \f08a';
}
.build-container .build-health:before,
.build-header .build-health:before {
  color: #ed4949;
  font-family: 'FontAwesome';
  letter-spacing: 5px;
  opacity: .8;
}

.check-style{
	color: #20c05c;
  margin-left: 10px;
}

.header {
  color: #aaa;
  font-size: 13px;
  text-transform: uppercase;
}

.status-bar {
  background: #eee;
  border-radius: 9px;
  height: 18px;
  width: 90%;
}
.status-bar .status-value {
  background: rebeccapurple;
  border-radius: 9px;
  display: block;
  height: 100%;
  max-width: 100%;
  min-width: 18px;
  opacity: .7;
}

.card-col-sml {
  float: left;
  min-height: 1px;
  width: 5%;
}

.card-col-med {
  float: left;
  min-height: 1px;
  width: 19%;
}

.card-col-lg {
  float: left;
  min-height: 1px;
  width: 27%;
}

.pnospace {
    margin: 0;
    padding: 0;
}

.car-image{
  object-fit: cover;
  width: 250px;
  height: 250px;
}
</style>