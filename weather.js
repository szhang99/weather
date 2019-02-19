	var testapp = angular.module('testapp', [ 'ui.bootstrap' ]);

	//create the controller
	testapp.controller('testController',['$scope','$http','$dialog',function($scope, $http, $dialog) {

								$scope.has_data = false;
								//the function for the submit
								$scope.get_weather = function(e) {
									//to test the emptiness
									if ($scope.location==undefined || $scope.location == "") {
										alert("Please input a zipcode or city/state");
										return;
									}

									//only allow number, letters or space ()
									var regex = /^[0-9a-zA-Z\s,]+$/
									if (!regex.test($scope.location)) {
										alert("Please input numbers and letters only");
										return;
									}	
									$scopelocation=$scope.location.replace(",","&");

									$scope.location=$scope.location.replace(" ","&");
									
									 window.location.href="weather_info.html?param="+$scope.location;
								}
	
							$scope.init_weather =function (){
								url =new URL(window.location.href);
								var param= url.searchParams.get("param");
								param=param.replace(" ","&");
								param=param.replace(",","&");
								var url = "http://api.openweathermap.org/data/2.5/weather?units=imperial&q="
									+ param
									+ "&APPID=3f31e269c4ff19b9b1d7b5aea129d6a9";
							 
							$http.get(url).then(

											function(response) {
												var d = response.data;
												console.log(d);
												$scope.has_data = true;
												var date =  new Date();
												$scope.date_time =(date.getUTCMonth()+1)+"/"+date.getUTCDate()+"/" +date.getUTCFullYear();
												$scope.description = d["weather"][0]["description"];
												$scope.city = d["name"];
												$scope.temp = d["main"]["temp"];
												$scope.humidity = d["main"]["humidity"];
												$scope.temp_min = d["main"]["temp_min"];
												$scope.temp_max = d["main"]["temp_max"];
												var wind_deg = d["wind"]["deg"];
												$scope.wind_speed = d["wind"]["speed"];


											},
											function(errResponse) {
												console.error('Error:'+ errResponse);

											}

									);

							//redirect
						location.href=weather_info.html;

					
							}	
							} ]);
