describe("events", function() {

	var item;
	var test = function(){};

	beforeEach(function(){
		item = Object.create(Events,{});
	});

	afterEach(function(){
		item = undefined;
	});

	it("are present", function() {
		expect(item.on).toBeDefined();
		expect(item.off).toBeDefined();
		expect(item.trigger).toBeDefined();
	});
	
	it("using 'on' register event",function(){
		item.on("customEvent",null);
		expect(item._eventMap.customEvent).toBeDefined();
	});

	it("regeristing 'on' calls registered callback",function(){
		var flag = false;
		item.on("customEvent",function(){ flag = true; });
		item.trigger("customEvent");
		expect(flag).toBeTruthy();
	});

	it("using 'off' with function reference unregisters event",function(){
		item.on("customEvent",test);
		item.off("customEvent",test);
		expect(item._eventMap.customEvent.length).toEqual(0);
	});

	it("using 'off' inside an event callback works",function(){
		item.on("customEvent",function(e){
			e.target.off(e.type);
		});
		item.trigger("customEvent");
		expect(item._eventMap.customEvent.length).toEqual(0);
	});
	
	it("with 'configurable' set to false do not get removed",function(){
		item.on("customEvent",test,this,false);
		item.off("customEvent");
		expect(item._eventMap.customEvent.length).toEqual(1);
	});

	it("present are returned by 'has'",function(){
		item.on("customEvent",null);
		expect(item.has("customEvent")).toBeTruthy();
	});

});