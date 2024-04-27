(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Text11 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CC0000").s().p("AAuD4Ih0kAQgDgIgCgOIgFggIAAANIgBAXIgCAUIglD+IiUAAIBLnvICRAAIByD8QAGAOADAPQAEAOABAQIAAggIACgbIAnj8ICUAAIhNHvg");
	this.shape.setTransform(38.75,28.675);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CC0000").s().p("Ah0D4IBLnvICeAAIhLHvg");
	this.shape_1.setTransform(-1.075,28.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CC0000").s().p("AgbD4IgKj4IAAgHIABgSIADgaIgHAcIgGAUIhTD7IiTAAIgenvICPAAIAAEDIgBAcIgCAbIAGgfQADgNADgIIBbkGIB7AAIAEEAIgBAaIgDAeIAHgbIAGgYIBUkFICWAAIi7Hvg");
	this.shape_2.setTransform(-40.05,28.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-87,-14.9,181,87.2);


(lib.Text10 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AgZBIQAAgGAFgHQAFgHAGAAQAEAAAFAEQAGAEAAADIgBAHQgBAIgGAEQgGAEgEAAQgNAAAAgOgAgOAbQgCgXAFgXQAGgaAAgNIABgKQABgIAGgFQAGgEAEAAQAFAAAEAEQAEADAAAEIgEAYIgKAnQgFARAAALQAAAJgEAGQgLAAgGgFg");
	this.shape.setTransform(123.525,8.175);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("AgSBSQgFgDgCgJIgBgZQAAgTAFgnQAEgoACgBIgbACIgaACQgNAAgEgDQgFgDAAgHQAAgGAFgDQAFgDAUAAQAiAAAggFQAkgFASAAQAWAAAFAFQAEAFAAAEQAAAMgKAAIgLAAIgRgBQgdAAgMAEIgCAGIgEAoQgEAiAAAWQAAAJACALIAAAEQAAAGgEAFQgCAFgGAAQgEAAgGgEg");
	this.shape_1.setTransform(112.85,8.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0000").s().p("AgTBQQgEgHAAgSQAAgLAGgpIAGgtIADgTQABgNADgDQACgDAEgDQAFgDADAAQAHAAADAFQAEAFAAAIIgJAlIgDAQIgCARQgEAZAAAJQAAAPACAQQABAKgGAGQgFAEgGAAQgIABgDgIg");
	this.shape_2.setTransform(100.225,8.65);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF0000").s().p("AhNBVQgFgGAAgDQAAgDADgFIACgHQACgGAAgOQADgpAHgsIACgOQAAgBAAAAQAAAAAAgBQAAAAgBAAQAAAAgBAAQgMgEAAgIQAAgFAFgFQAFgFAGAAIAQABIAdgCIAZgCQAhABAUASQAVASAAAfQAAAgggAcQgfAbgrAKIgRAEIgLAGQgIAGgIAAQgGgBgEgFgAgeg/IgEAAQgNBOAAAgIABAJQAGgBAdgIQAdgKASgTQASgSAAgYQAAgTgNgMQgOgLgWAAQgOAAgVADg");
	this.shape_3.setTransform(77.375,9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF0000").s().p("AgTBQQgEgHAAgSQAAgLAGgpIAGgtIADgTQABgNADgDQACgDAEgDQAFgDADAAQAHAAADAFQAEAFAAAIIgJAlIgDAQIgCARQgEAZAAAJQAAAPACAQQABAKgGAGQgFAEgGAAQgIABgDgIg");
	this.shape_4.setTransform(64.075,8.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF0000").s().p("AhNBVQgFgGAAgDQAAgDADgFIACgHQACgGAAgOQADgpAHgsIACgOQAAgBAAAAQAAAAAAgBQAAAAgBAAQAAAAgBAAQgMgEAAgIQAAgFAFgFQAFgFAGAAIAQABIAdgCIAZgCQAhABAUASQAVASAAAfQAAAgggAcQgfAbgrAKIgRAEIgLAGQgIAGgIAAQgGgBgEgFgAgeg/IgEAAQgNBOAAAgIABAJQAGgBAdgIQAdgKASgTQASgSAAgYQAAgTgNgMQgOgLgWAAQgOAAgVADg");
	this.shape_5.setTransform(50.825,9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF0000").s().p("AgTBQQgEgHAAgSQAAgLAGgpIAGgtIADgTQABgNADgDQACgDAEgDQAFgDADAAQAHAAADAFQAEAFAAAIIgJAlIgDAQIgCARQgEAZAAAJQAAAPACAQQABAKgGAGQgFAEgGAAQgIABgDgIg");
	this.shape_6.setTransform(27.925,8.65);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FF0000").s().p("AgZBIQAAgGAFgHQAFgHAGAAQAEAAAFAEQAGAEAAADIgBAHQgBAIgGAEQgGAEgEAAQgNAAAAgOgAgOAbQgCgXAFgXQAGgaAAgNIABgKQABgIAGgFQAGgEAEAAQAFAAAEAEQAEADAAAEIgEAYIgKAnQgFARAAALQAAAJgEAGQgLAAgGgFg");
	this.shape_7.setTransform(10.225,8.175);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF0000").s().p("AhNBZQgFgFAAgJQAAgHADgOQAIgfAJhgQAAgEAFgEQAEgEAEAAQAQAAAAATQAAAJgEATQgEAVAAAKQABABAIAAQAQABAdgDQAegCADgFQACgEACgTQADgUAAgWQAAgEAFgEQAFgFAFABQAHAAAEADQAEAFAAAFQAAAKgEAXQgFAagDAnQgEApAAANQAAAGgGAGQgGAHgFgBQgFAAgFgDQgEgEAAgGIADgbQADgYAAgJQAAgFgCAAIgWABIgWACIgWABQgTABAAABQgEAGgBAdQAAARgEALQgFALgGAAQgIABgEgFg");
	this.shape_8.setTransform(-2.975,8.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF0000").s().p("AA7BQQgJgKgIgSQgJgSAAgCIAAgBQgGAAgWAFQgVAEgNAEIgGACQgFAAgCgDIgNAWQgKARgEACQgEACgDAAQgEAAgGgFQgGgEAAgFQAAgFAdgtQAQgXAOgYQAagxAGgIQAFgIAGAAQAKAAAFAGQACABAAAGIgBAIQAWBBAMAaQAMAbAMANIAIAIIABAGQAAAGgFAEQgEAFgHAAQgJAAgJgLgAgbARIAQgDIAZgFIAKgBIgRgxIgBgFg");
	this.shape_9.setTransform(-22.525,8.875);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FF0000").s().p("AhCBWQgEgEgBgIIAAgEQgBgBADgGQAEgPAHgxIAHg3IgBgBIgDgEQgCgEAAgEIABgEQAAgCAFgCQAFgDADAAIAMABQAJAAA1gHIATgDIABAAQAVgBAAAPQAAADgDAEQgEAEgEABIgkACQgTABgMACQgOACgBACQgBABgBAGIgEAVQgDALAAAHIAVgCIATgDQARgEAJAAQATAAAAALQAAAHgFAEQgGADgLABIgPACIgLABQgfAEgGACQgBAAAAAAQgBABAAAAQAAAAgBABQAAAAAAABIgEARIgDAWQABAEAFAAIAdgDIAdgEQAQgEAFAAQAPACAAAMQAAAFgEADQgLAGgVABIgmAEQgUAEgSAAQgKAAgEgEg");
	this.shape_10.setTransform(-39.0792,8.8932);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FF0000").s().p("AgZBLQAAgIAEgWQADgVAAgJQAAgFgBgFQgKgJgOgTQgQgVgHgGQgOgJgDgGQgEgFAAgEQAAgDAFgEQAFgFAEAAQASAAAmAzIARAVIAIgLIAJgKQAdgeAJgNQAKgNALAAQAFAAAEAEQADAEAAAFQAAAHgrArQgfAggBAEQgEAKgFA3QAAAMgCACIgGAEIgIABQgNAAAAgRg");
	this.shape_11.setTransform(-55.025,8.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-66,-14.9,195.6,45.8);


(lib.Text9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AgZBIQAAgGAFgHQAFgHAGAAQAEAAAFAEQAGAEAAADIgBAHQgBAIgGAEQgGAEgEAAQgNAAAAgOgAgOAbQgCgXAFgXQAGgaAAgNIABgKQABgIAGgFQAGgEAEAAQAFAAAEAEQAEADAAAEIgEAYIgKAnQgFARAAALQAAAJgEAGQgLAAgGgFg");
	this.shape.setTransform(118.325,8.175);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("AgZBIQAAgGAFgHQAFgHAGAAQAEAAAFAEQAGAEAAADIgBAHQgBAIgGAEQgGAEgEAAQgNAAAAgOgAgOAbQgCgXAFgXQAGgaAAgNIABgKQABgIAGgFQAGgEAEAAQAFAAAEAEQAEADAAAEIgEAYIgKAnQgFARAAALQAAAJgEAGQgLAAgGgFg");
	this.shape_1.setTransform(110.575,8.175);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0000").s().p("Ag9BXQgHgFAAgIQAAgFAEgFQADgGAEAAIAFABQANAGALAAQASAAAVgKQAXgLAAgKQAAgEgGgEQgFgDgRgGQgZgIgNgGQgMgEgIgJQgGgJAAgMQAAgWAZgTQAagTAiAAQATAAAMAIQALAIAAAKQAAAVgXAAQABgMgHgEQgFgFgMAAQgUAAgQAKQgQAJAAAMQgBAHAHAGQAGAFAaAIQAbAIAOAIQAOAKgBAOQABAWgjATQghATgmAAQgLAAgIgFg");
	this.shape_2.setTransform(89.5,8.925);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF0000").s().p("AgrBRQgRgIgJgSQgJgTAAgWQAAgLADgRIAEgWIABgLIADgPQABgNAFgHQAEgGAIAAQAEAAAFAGQAEAHAAADIgFAaIgFAdQgEAWAAAIQAAAeANAKQANAKAJAAQAdAAAMgMQALgNADgdIACgJIACgXQACgpAGgKQAFgLAKAAQAMAAAAAQQAAAJgFAaIgDAeQgCAjgIAQQgIARgTAMQgUANgcAAQgMAAgRgIg");
	this.shape_3.setTransform(73.075,8.875);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF0000").s().p("Ag6BRQgSgOAAgbQAAgbATggQASgiAdgUQAagVAbAAQAPAAAJAJQAKAJAAANQAAAOgCAGQgCAGgHAEQgHAEgEAAQgFAAgDgDQgEgDABgFIABgLQACgHAAgGQABgHgGgBQgRAAgVASQgUATgPAaQgPAaAAAVQAAANAIAJQAIAKAPAAQAJAAANgFQANgFALgIQAMgIAEAAQAJAAAAAIQAAAMgaAPQgZAQgXAAQgWAAgSgOg");
	this.shape_4.setTransform(55.3,8.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF0000").s().p("AhHBHQgPgTAAgVQAAgXAPgdQAOgeAYgTQAXgTAXAAQAUAAANAFQANAFAKAJQALAJAEAKQADAJAAARQAAAPgKAUQgJAVgSATQgTATgSALQgSAKgeAAQgVAAgPgTgAggghQgZAhAAAeQAAAPAJAJQAJAKAKAAQAfAAAbgeQAcgeAAghQAAgMgEgHQgFgIgLgFQgLgEgNAAQgVAAgYAgg");
	this.shape_5.setTransform(37.1,8.825);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF0000").s().p("Ag8BVQgGgEAAgJQAAgOADgdIAMhVIgBgHIgCgIQAAgFAFgEQAFgFAFAAIAFAAIAJACIAlgEQAVgDALABQALAAAGADQAGAEAAACQAAAKgJAGQgDABgEAAIgEAAIgKgBQgOAAgTACQgSADgHACQgHAXgCAeIAKgBIAhgFIAVgCQASAAAAAMQAAACgEAEQgDADgEABQgEACgLACIgeAEIgbAEQAAAAAAAAQgBABAAAAQAAAAAAABQgBAAAAABQgBABAAAMIgCAYIABAOQAAAOgNABQgHAAgFgGg");
	this.shape_6.setTransform(21.575,8.95);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FF0000").s().p("AhJBJQAAgJAHg2QAFgqAAgHIgBgMQgHgDAAgKQAAgKAggIQAggHAVAAQAaAAAQALQAQALAAATQAAAagdAVQgdASgoAJIgSAEQgDAbAAAQQAAAHgDAFQgEAFgGAAQgPAAAAgRgAgfg5IgHA9QAigFAYgPQAagOAAgQQAAgUgfAAQgUAAgaAJg");
	this.shape_7.setTransform(-3.9,8.7);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF0000").s().p("AhCBWQgEgEgBgIIAAgEQgBgBADgGQAEgPAHgxIAHg3IgBgBIgDgEQgCgEAAgEIABgEQAAgCAFgCQAFgDADAAIAMABQAJAAA1gHIATgDIABAAQAVgBAAAPQAAADgDAEQgEAEgEABIgkACQgTABgMACQgOACgBACQgBABgBAGIgEAVQgDALAAAHIAVgCIATgDQARgEAJAAQATAAAAALQAAAHgFAEQgGADgLABIgPACIgLABQgfAEgGACQgBAAAAAAQgBABAAAAQAAAAgBABQAAAAAAABIgEARIgDAWQABAEAFAAIAdgDIAdgEQAQgEAFAAQAPACAAAMQAAAFgEADQgLAGgVABIgmAEQgUAEgSAAQgKAAgEgEg");
	this.shape_8.setTransform(-20.9792,8.8932);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF0000").s().p("AhCBWQgEgEgBgIIAAgEQgBgBADgGQAEgPAHgxIAHg3IgBgBIgDgEQgCgEAAgEIABgEQAAgCAFgCQAFgDADAAIAMABQAJAAA1gHIATgDIABAAQAVgBAAAPQAAADgDAEQgEAEgEABIgkACQgTABgMACQgOACgBACQgBABgBAGIgEAVQgDALAAAHIAVgCIATgDQARgEAJAAQATAAAAALQAAAHgFAEQgGADgLABIgPACIgLABQgfAEgGACQgBAAAAAAQgBABAAAAQAAAAgBABQAAAAAAABIgEARIgDAWQABAEAFAAIAdgDIAdgEQAQgEAFAAQAPACAAAMQAAAFgEADQgLAGgVABIgmAEQgUAEgSAAQgKAAgEgEg");
	this.shape_9.setTransform(-37.3292,8.8932);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FF0000").s().p("AhKBWQgEgEAAgGIABgIQADgMAHhFQAGg7AEgJQAFgIAIAAQAPAAAAAQQgHAegEAnQARgMAHgIIAHgHIARgRQAJgIAEgIQAGgLAEgEQADgEAFAAQAFAAAGAEQAGAFAAAGQAAAFgHAJQgGAJgNAMIgsAmIAwAlIAMAIIAGAEQAGAEAUABIABAHQAAAIgFAFQgEAFgKAAQgMAAgTgOIgtgiQgPgLgIgDQgFABgDAmQgCAPgDAHQgEAHgIAAQgHAAgDgEg");
	this.shape_10.setTransform(-54.575,8.925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-66,-14.9,190.4,45.8);


(lib.Text8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AgrB3QAAgJAJgLQAJgMAKAAQAGAAAKAGQAJAHABAFIgDAMQgBANgKAGQgLAIgIgBQgVAAAAgYgAgYAtQgDgmAIgnQAKgsAAgVIACgRQACgOAKgHQAKgHAHgBQAIAAAHAHQAHAFAAAHQAAAFgHAkIgQBAQgJAeAAASQgBAOgGAKQgTABgKgJg");
	this.shape.setTransform(125.1,67.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("AhmCQQgMgIAAgMQAAgKAFgIQAGgIAHAAQAFgBAEACQAUAJASAAQAeAAAmgRQAmgSgBgQQABgHgKgGQgKgHgcgJQgqgOgVgJQgVgIgMgOQgLgPABgUQAAglAqggQAqgfA5AAQAhAAATANQATANAAARQAAAjgmAAQAAgUgKgHQgJgIgUAAQghAAgbARQgcAQgBASQABANAKAJQALAIArANQAuAOAXAPQAXAQAAAXQAAAmg6AfQg4Afg+AAQgUAAgMgJg");
	this.shape_1.setTransform(106.05,68.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0000").s().p("AA3CjQgKgHABgKIAFgdIAHgmQhAAwg0AAQgiAAgVgUQgVgUAAgkQAAg3AigzQAjg1AxgfQAwgfAxAAQAZAAAOAJQAPAKAAAOQAAAMgKAOQgKAPgKAAQgGAAgEgDQgDgDgDgHQgEgJgEgEQgGgDgJAAQgeAAgkAdQgmAdgYAoQgYAnAAAkQAAAmAhAAQARAAAXgIQAXgJAbgTQAbgTAFgPQAFgPADgSQABgLAHgDQAGgEALAAQAaAAAAARQABAHgIAOQgFAMgEARQgFAQgFAbQgEAbAAAMIAAAfQgBAJgDAFQgDAGgGADQgFADgHAAQgKAAgIgIg");
	this.shape_2.setTransform(77.7,68.975);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF0000").s().p("AiFCSQgGgHAAgTQAAgQAHgdIABgCIAOhBQAQhNACgfQAAgPACgFQABgFAIgGQAHgEAKAAQAFAAAIADQAIAEAFAVQAJAiAhA4QAiA3AbAiQAHgiAKg1IALhCQAEgXACgTQAAgRAKgFQAJgHAJAAQAIAAAHAJQAFAKAAANQAAAKgFAUQgNAsgMBGQgLBGAAALIAAAGQAAALgDAGQgCAFgHAFQgIAFgMAAQgGAAgEgBQgDgBgGgHQgFgGgGgLIgOgWQgug8grhOQgGAYgMBZIgCARQgCAJgBASQgBAUgJAJQgJAKgHAAQgOgBgEgGg");
	this.shape_3.setTransform(46.55,68);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF0000").s().p("AggCGQgHgNAAgdQABgTAIhFIALhLIAFgfQADgWADgEQADgGAIgFQAJgGAEAAQAMAAAGAJQAFAKABANIgPA8IgFAcIgEAcQgGAqAAAPQAAAaADAZQADASgLAIQgIAJgKAAQgOAAgFgMg");
	this.shape_4.setTransform(24.4,67.875);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF0000").s().p("AiDBuQABgfAGg3QAHg2AJgpIACgMIADgOIgCgFQgHgJAAgFQAAgJAKgHQAKgHAHAAIAJAAIAHABQA5gIAXgBQArAAAaAVQAZAUAAAfQAAAcgYAaQgZAagrAQQBGA4AkAWQANAHAAAMQAAAIgJAIQgJAIgIgBQgMAAgNgJQgPgKgbgVIgegZQgkgfgRgKQgUAAAAgVQAAgKAJgFQAJgHAMAAIAHABIAFABQANAAAhgVQAhgVAAgbQAAgOgNgJQgPgLgWAAQgZAAgQAEIgRAEIgDAHQgCAEgHAjQgHAjgFAqQgFAqAAAUQAAANABAJIACASQAAAIgIAHQgJAJgKgBQgbAAAAglg");
	this.shape_5.setTransform(4,68.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF0000").s().p("AhvCPQgHgGgBgPIgBgGIAEgMQAIgYALhSQALhTAAgJIgBgCQgBgBgDgGQgEgGAAgHIABgGQABgEAHgEQAIgEAHAAIASABQAQAABZgMIAfgEIACAAQAkgCAAAZQAAAFgHAHQgGAHgGABIg8ADQggACgVAEQgXAEgCACQgCACAAAKQgBAJgGAZQgFATgBAMQAMAAAYgDQAWgCAKgDQAcgHAPAAQAfAAAAATQAAAMgIAGQgJAFgSACIgaADIgSACQg1AHgKADQgEABgBAEQgCADgEAaQgEAZAAAKQABAIAIAAQAJAAAogGIAwgHQAbgFAIAAQAZADAAAUQAAAJgGAEQgTAJgjACQgbACglAFQgiAHgeAAQgQAAgHgHg");
	this.shape_6.setTransform(-40.325,68.2886);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FF0000").s().p("AiCBuQgBgfAIg3QAGg2AJgpIADgMIACgOIgCgFQgGgJgBgFQAAgJAKgHQAJgHAIAAIAJAAIAHABQA5gIAXgBQArAAAaAVQAZAUAAAfQAAAcgZAaQgYAagrAQQBGA4AkAWQAMAHAAAMQAAAIgIAIQgJAIgIgBQgMAAgOgJQgOgKgagVIgfgZQgkgfgQgKQgVAAAAgVQAAgKAJgFQAJgHAMAAIAHABIAFABQANAAAggVQAjgVAAgbQgBgOgOgJQgOgLgWAAQgYAAgQAEIgSAEIgEAHQgCAEgGAjQgHAjgFAqQgGAqAAAUQABANACAJIABASQAAAIgIAHQgIAJgKgBQgbAAAAglg");
	this.shape_7.setTransform(-68.4,68.05);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF0000").s().p("AghCGQgFgNgBgdQABgTAIhFIAMhLIAEgfQACgWAEgEQAEgGAHgFQAJgGAFAAQALAAAGAJQAGAKgBANIgNA8IgGAcIgDAcQgHAqAAAPQAAAaADAZQACASgKAIQgIAJgKAAQgOAAgGgMg");
	this.shape_8.setTransform(-89.7,67.875);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF0000").s().p("AhlCPQgKgIAAgOQAAgZAFgwIAViPQAAgHgCgEQgDgJAAgFQAAgHAJgHQAHgIAIAAIAKABQAHABAHAAIA+gGQAjgEASAAQATAAAKAGQALAGAAAFQgBAQgPAJQgFADgGAAIgHgBIgRgBQgYAAgfADQgfAEgLAFQgMAlgDAzIAQgCQAfgDAYgFQAWgEANAAQAfAAAAAVQgBACgGAHQgFAGgHADQgGADgSACIg0AHQgeADgPAEQAAAAAAAAQgBABAAAAQgBABAAAAQAAABAAABIgDAXQgCAVAAASIABAZQAAAXgWAAQgLAAgJgIg");
	this.shape_9.setTransform(-106.15,68.375);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgqA4QgLgMAAgXQAAgfAWgdQAXgdAaAAQANABAIAHQAIAJAAALQAAAVgTATQgUAQgeAIQgDAAAAAEQAAAGAFAEQAFAGAIAAQAXAAAXgZQAFgEAEAAQAHAAAAAHQAAANgVARQgVAQgYABQgUAAgLgNgAgGgdQgNAPgEAQQATgDANgMQAOgMAAgKQAAgEgCgCQgDgDgDAAQgKAAgLAPg");
	this.shape_10.setTransform(152.75,33.7);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgwA4QAAgFAEgEQAFgFAFAAIAHACQAFACAEAAQALAAALgEQAMgDAEgGQgBgFgTgKQgXgLgHgIQgGgIgBgKQAAgVAYgPQAWgPAUgBQAUAAAAARQAAAFgFADQgEAFgEAAIgEgDIgFgBQgLAAgMAHQgMAHAAAKQAAAEAFAFQAEADANAHQAVAIAGAIQAGAIAAAKQAAAQgXAMQgXALgcAAQgVAAAAgPg");
	this.shape_11.setTransform(141.1,33.65);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AguA2QgLgNAAgTQAAgdAVgdQAUgdAdAAQAUAAAMAOQANAPAAAVQAAAJgCAHQgIAcgWATQgWASgVAAQgRAAgMgMgAgEgjQgIAIgIAQQgIAOAAARQAAAJAEAHQADAGAGAAQAOAAAPgRQAQgSAAgUQAAgMgFgIQgFgIgJAAQgJAAgGAGg");
	this.shape_12.setTransform(129.575,33.925);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AhABfQgFgDABgHIADgUQAMg/AHhGQACgRAGgGQAEgHAFAAQAGAAAFAFQAFAFAAAIQAAAOgEARIgMA1QgFAXgCANQATgkAPgMQAMgOAPAAQAKAAAHAHQAGAHADAcIADAWIAFAPQADAHAEAFQADAFABAEQAAAEgEAEQgFADgFAAQgLAAgIgLQgHgLgCgUQgCgZgCgHQgCgHgFAAQgHAAgTAcQgUAbgIAQQgGAMgDAEQgCAEgFAAQgGAAgFgEg");
	this.shape_13.setTransform(115.45,30.575);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AggBOQgHgJAAgRQgBgQAMguIgKABIgDAAQgFAAgGgEQgFgDAAgIQAAgKALAAIAZgBQAFgOAGgXQADgOAKAAQAHAAAEAEQADAEAAAEIgKAlIApgEQAGAAACACQACACAAAFQAAAKgRADIgpAHQAAAAgGAZQgFAaAAAGQAAAJACAEQACAEAFAAQAFAAAGgCQAHgCAJgIQAGgFAEAAQAEAAACACQAAAAABABQAAAAAAAAQABABAAABQAAAAAAABQAAAKgRANQgQANgSAAQgQAAgIgJg");
	this.shape_14.setTransform(102.65,31.775);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AhABfQgFgDABgHIACgUQAMg/AIhGQACgRAFgGQAFgHAFAAQAHAAAEAFQAEAFABAIQAAAOgDARIgNA1QgFAXgCANQATgkAOgMQAOgOAOAAQAKAAAGAHQAHAHADAcIAEAWIAEAPQADAHAEAFQAEAFgBAEQAAAEgDAEQgFADgFAAQgLAAgHgLQgJgLgBgUQgCgZgCgHQgCgHgFAAQgHAAgTAcQgUAbgIAQQgFAMgEAEQgCAEgEAAQgIAAgEgEg");
	this.shape_15.setTransform(79.65,30.575);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgzBVQgWgQAAgKQAAgJAJAAQADAAALAHQAbARASAAQAOAAAKgSQAKgSAGgwQgOAOgRAKQgQAJgMAAQgNAAgHgHQgGgIAAgLQgBgTAOgWQAOgWAYgQQAYgRATAAQALAAAIAGIADACQADACADAGQACAFAAADIgFAOQgEANgCAMIgHA5QgFApgSATQgSATgVAAQgXAAgWgPgAAOhAQgOAKgLASQgLARgBAMQABAGAEAAQAPAAAOgMQAPgNAJgQQAKgQAAgIQAAgEgDgCQgCgDgCAAQgKAAgOALg");
	this.shape_16.setTransform(64.1,37.475);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AAdA0QgGgOAAgWQgLAVgOAMQgOAMgQAAQgJAAgJgJQgJgKAAgUQAAgOAHgbQAGgXAAgMQAFgKAKAAQAHAAAEAFQAEAEAAAFQAAAIgGAPIgIAaQgEAQAAAFQAAAPAHAAQAKAAARgTQARgTAFgUQAFgUAEgHQAFgGAHAAQAMAAAAAOIgCAIQgHAUAAAZQAAAfALAGQADACAAADQAAAEgGAEQgGAEgFAAQgKAAgEgNg");
	this.shape_17.setTransform(50.825,34.075);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AguA2QgLgNAAgTQAAgdAVgdQAUgdAdAAQAUAAAMAOQANAPAAAVQAAAJgCAHQgIAcgWATQgWASgVAAQgRAAgMgMgAgEgjQgIAIgIAQQgIAOAAARQAAAJAEAHQADAGAGAAQAOAAAPgRQAQgSAAgUQAAgMgFgIQgFgIgJAAQgJAAgGAGg");
	this.shape_18.setTransform(36.925,33.925);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("Ag2A5QgDgJAAgVIAAgXIADghIABgIQABgLABgEQABgFAFgDQAFgEAGAAQAHAAADADQADAEAAAEQAAAGgFARIgDAPIgDARIACgDQAOgdAQgRQAQgSAPAAQAMAAAIAGQAHAHAAAJQAAAGgCAEQgDAEgEAAQgIAAgGgGQgEgEgCAAQgJAAgUAbQgUAbgFAiQgBAJgEAEQgFAEgHAAQgIAAgEgJg");
	this.shape_19.setTransform(25.475,34.025);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AhABfQgFgDABgHIADgUQAMg/AHhGQACgRAGgGQAEgHAFAAQAGAAAFAFQAFAFAAAIQAAAOgEARIgLA1QgGAXgCANQATgkAPgMQAMgOAPAAQAKAAAHAHQAGAHADAcIADAWIAFAPQADAHAEAFQADAFAAAEQAAAEgDAEQgFADgFAAQgLAAgIgLQgHgLgCgUQgCgZgCgHQgCgHgFAAQgHAAgTAcQgUAbgIAQQgGAMgDAEQgCAEgFAAQgGAAgFgEg");
	this.shape_20.setTransform(10.6,30.575);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AggBOQgHgJAAgRQgBgQAMguIgKABIgDAAQgFAAgGgEQgFgDAAgIQAAgKALAAIAZgBQAFgOAGgXQADgOAKAAQAHAAAEAEQADAEAAAEIgKAlIApgEQAGAAACACQACACAAAFQAAAKgRADIgpAHQAAAAgGAZQgFAaAAAGQAAAJACAEQACAEAFAAQAFAAAGgCQAHgCAJgIQAGgFAFAAQADAAACACQAAAAABABQAAAAAAAAQABABAAABQAAAAAAABQAAAKgRANQgQANgSAAQgQAAgIgJg");
	this.shape_21.setTransform(-2.2,31.775);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AhCBoQgGgEAAgFQAAgJADgNQAShGABhKIAAgCQAAgQACgFQABgFADgEQAFgEAHAAQANAAAAAUIgCAbIgCAIQAOgXARgOQATgPAOAAQANAAAJAJQAJAKAAAOQABAmgeAfQgeAegbAAQgNAAgFgLIgEAZIgFAuQgBALgEAEQgFAFgFAAQgGAAgEgEgAAAgxQgWAbgBAQQABAEAEADQADADAGAAQAOAAATgWQAUgYAAgWQgBgHgCgDQgCgDgDAAQgOAAgWAcg");
	this.shape_22.setTransform(-26.05,37.475);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AhtAtQAAglADgYQAEgTAAgUQAAgEACgDQADgEAGAAQARABAAAVQAAAHgGAcQgEAQAAAHQAihIAbAAQALAAAGAIQAGAKAAAdQAAAaADAAQACAAANgZQAOgdAJgKQAKgJALAAQANAAAGALQAGALACAbQACAUADALQADAKAHAEQAGADAAAGQAAAFgHAFQgGAFgHAAQgMAAgHgMQgHgLgCgkQgBgRgCgFQgBgGgDABQgDgBgFAJIgRAgQgKAXgIAJQgIAIgHABQgHgBgHgFQgHgGAAglQgBgggEABQgFAAgSAcQgTAcgKAYQgBAMgMgBQgPAAAAgVg");
	this.shape_23.setTransform(-44.775,33.85);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AAdA0QgGgOAAgWQgLAVgOAMQgOAMgQAAQgJAAgJgJQgJgKAAgUQAAgOAHgbQAGgXAAgMQAFgKAKAAQAHAAAEAFQAEAEAAAFQAAAIgGAPIgIAaQgEAQAAAFQAAAPAHAAQAKAAARgTQARgTAFgUQAFgUAEgHQAFgGAHAAQAMAAAAAOIgCAIQgHAUAAAZQAAAfALAGQADACAAADQAAAEgGAEQgGAEgFAAQgKAAgEgNg");
	this.shape_24.setTransform(-64.725,34.075);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AgqB4QgOgMAAgKQAAgDADgDQAEgDABAAQADAAAGAFQAOANAJgBQAKAAAGgQQAFgPAEhVIACghQACgMAFgGQAFgEAJAAQAFAAAEADQAEAEAAAFIAAAFQgFASgDAeIgDAoQgBAigFASQgFATgLALQgMALgNAAQgPAAgOgNgAAYhlQgEgHAAgGQAAgGAHgGQAGgFAIgBQAFABAGAEQAFADAAAEQAAADgDAKQgCAJgFABQgFACgIAAQgGAAgEgGg");
	this.shape_25.setTransform(-78.125,33.9);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AgVBgQgEgIAAgTQAAgpAJg3QALg3AFgLQAFgKAIAAQANAAAAAOQAAAHgCAGIgJAlQgHAVgCAYQgEAYAAAPQAAAOADAVIABAHQgBAHgFAFQgEAFgGAAQgIAAgDgIg");
	this.shape_26.setTransform(-91.75,30.55);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AgWBgQgDgIAAgTQAAgpAKg3QAJg3AGgLQAGgKAHAAQANAAAAAOQAAAHgCAGIgKAlQgFAVgDAYQgEAYABAPQgBAOADAVIAAAHQAAAHgEAFQgFAFgGAAQgIAAgEgIg");
	this.shape_27.setTransform(-98.55,30.55);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgfBKQAAgUAFgcIACgMIAAAAIAFgXQAAgJADgGQAEgGAGAAQAIAAAEAEQAFAEgBAEQAAAFgDAOIgBACQgGAXgBAOIgBAXQgBAIADALIAAAEQAAADgEAEQgGAFgGAAQgPAAAAgYgAAAhCQgGgGAAgGQAAgJAGgFQAEgFALAAQAHAAAFAFQAFAEAAAHQAAAIgHAGQgIAGgGAAQgGAAgFgFg");
	this.shape_28.setTransform(-105.15,30.825);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AhUAbQgNgpAAgcQAAgKAFgGQAFgHAJAAQAFAAAEAFQAFAFAAAEIgBAQIgBAOQAAAMAFAUQAFAUADAAQABAAAKgUQAOgbAIgOQAMgWAIgHQAHABAFAEQAFADAAAFIgBAGIAAAEQAAAjATAcQABAAAAAAQAAAAABAAQAAAAAAgBQABAAAAgBIAFgRQAHgaAJgUQAJgUAGgFQAFgFAIAAQAEAAAEAEQADADAAAEQAAAFgCADQgPAUgMAjQgMAlgFAIQgFAIgDAAQgLAAgHgEQgHgEgGgLQgHgLgFgRQgEgQgBgHIgSAkIgCADQgUApgKAAQgRAAgNgqg");
	this.shape_29.setTransform(-119.525,33.825);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AgTBQQgEgHAAgSQAAgLAGgqIAGgtIADgSQABgNADgCQACgEAEgDQAFgEADAAQAHAAADAGQAEAFAAAJIgJAkIgDAQIgCAQQgEAaAAAJQAAAPACAQQABAKgGAFQgFAGgGAAQgIgBgDgHg");
	this.shape_30.setTransform(-143.725,31.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-150,8.1,311.1,95.5);


(lib.Text7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgZBIQAAgGAFgHQAFgHAGAAQAEAAAFAEQAGAEAAADIgBAHQgBAIgGAEQgGAEgEAAQgNAAAAgOgAgOAbQgCgXAFgXQAGgaAAgNIABgKQABgIAGgFQAGgEAEAAQAFAAAEAEQAEADAAAEIgEAYIgKAnQgFARAAALQAAAJgEAGQgLAAgGgFg");
	this.shape.setTransform(-12.325,-58.575);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgZBIQAAgGAFgHQAFgHAGAAQAEAAAFAEQAGAEAAADIgBAHQgBAIgGAEQgGAEgEAAQgNAAAAgOgAgOAbQgCgXAFgXQAGgaAAgNIABgKQABgIAGgFQAGgEAEAAQAFAAAEAEQAEADAAAEIgEAYIgKAnQgFARAAALQAAAJgEAGQgLAAgGgFg");
	this.shape_1.setTransform(-20.075,-58.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhOBCQAAgSAEghQAEggAGgZIABgIIACgHIgCgEQgEgFAAgDQAAgGAGgEQAGgEAEAAIAGABIAEAAQAigFAOgBQAZAAAPANQAQAMAAASQAAARgPAQQgPAPgZAKQAqAhAVANQAIAFAAAHQAAAFgGAEQgFAFgEAAQgIAAgIgGIgZgSIgSgQQgVgSgKgGQgNAAAAgNQAAgFAGgDQAGgEAGgBIAFABIADABQAHAAAUgNQAUgNABgQQAAgIgJgGQgIgGgOABQgOAAgKABIgLADIgCAEQgBADgDAUIgIAuQgDAaAAAMIABANIABAKQAAAFgFAEQgFAGgGAAQgQAAAAgXg");
	this.shape_2.setTransform(-41.55,-58);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgTBQQgEgHAAgSQAAgLAGgqIAGgtIADgSQABgNADgDQACgDAEgDQAFgDADgBQAHABADAFQAEAGAAAHIgJAkIgDARIgCAQQgEAaAAAJQAAAQACAOQABAMgGAEQgFAFgGABQgIAAgDgIg");
	this.shape_3.setTransform(-54.325,-58.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("Ag8BXQgIgFAAgIQAAgFADgFQADgGAFAAIAGABQALAGALAAQATAAAWgKQAWgLAAgKQAAgEgFgEQgGgDgSgGQgYgIgNgGQgNgEgGgJQgHgJAAgMQAAgWAagTQAZgTAhAAQAVAAALAIQALAIAAAKQAAAVgWAAQgBgMgGgEQgGgFgLAAQgUAAgQAKQgQAJgBAMQABAHAGAGQAGAFAaAIQAcAIANAIQAOAKAAAOQgBAWghATQgiATglAAQgNAAgGgFg");
	this.shape_4.setTransform(-66.15,-57.825);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("Ag9BXQgHgFAAgIQAAgFAEgFQADgGAEAAIAFABQANAGALAAQARAAAWgKQAXgLAAgKQAAgEgGgEQgFgDgSgGQgYgIgNgGQgMgEgIgJQgGgJAAgMQAAgWAZgTQAagTAiAAQATAAAMAIQALAIAAAKQAAAVgXAAQABgMgHgEQgFgFgMAAQgUAAgQAKQgRAJAAAMQAAAHAHAGQAGAFAaAIQAbAIAOAIQAOAKAAAOQAAAWgjATQghATgmAAQgLAAgIgFg");
	this.shape_5.setTransform(-91.05,-57.825);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AhCBWQgEgEgBgIIAAgEQgBgBADgGQAEgPAHgxIAHg3IgBgBIgDgEQgCgEAAgEIABgEQAAgCAFgCQAFgDADAAIAMABQAJAAA1gHIATgDIABAAQAVgBAAAPQAAADgDAEQgEAEgEABIgkACQgTABgMACQgOACgBACQgBABgBAGIgEAVQgDALAAAHIAVgCIATgDQARgEAJAAQATAAAAALQAAAHgFAEQgGADgLABIgPACIgLABQgfAEgGACQgBAAAAAAQgBABAAAAQAAAAgBABQAAAAAAABIgEARIgDAWQABAEAFAAIAdgDIAdgEQAQgEAFAAQAPACAAAMQAAAFgEADQgLAGgVABIgmAEQgUAEgSAAQgKAAgEgEg");
	this.shape_6.setTransform(-106.2792,-57.8568);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgZBLQAAgIAEgWQADgVAAgJQAAgFgBgFQgKgJgOgTQgQgVgHgGQgOgJgDgGQgEgFAAgEQAAgDAFgEQAFgFAEAAQASAAAmAzIARAVIAIgLIAJgKQAdgeAJgNQAKgNALAAQAFAAAEAEQADAEAAAFQAAAHgrArQgfAggBAEQgEAKgFA3QAAAMgCACIgGAEIgIABQgNAAAAgRg");
	this.shape_7.setTransform(-122.225,-58.325);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#000000").ss(2,1,1).p("ACHEYQkIjMgFlj");
	this.shape_8.setTransform(-18.5,-7.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-133.2,-81.7,155,102.80000000000001);


(lib.Text6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgMAjQAAgCACgEQADgDADAAQABAAAAAAQABAAAAABQABAAABAAQAAABAAAAIADADIgBAEQAAAEgCACIgGACQgGAAAAgIgAgHAOQgBgMADgLQADgNAAgGIABgGQAAgEACgCQADgCADAAIAEACQABAAAAABQAAAAABABQAAAAAAABQAAAAAAAAIgCAMIgFAUIgDANQAAAFgCADQgEAAgEgCg");
	this.shape.setTransform(5.925,-45.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgYAsIADgWIACgSIgBgBQgEgDAAgBQAAgDAFgDQACgCABgDIABgGQADgTAGgIQAHgIAJAAQAGAAAEAEQAFAEAAAFQAAAGgDAFQgCAGgEAAIgDgBIgBgDIAAgFQAAgKgDAAQgFAAgEAMQgEAMAAAJIABABIARAAQAFAAAAADQAAAEgGABQgGACgHAAIgFABIgCAPIgBALIAAAJIABALQgBABAAAAQAAAAAAABQgBAAAAABQgBAAAAABQgDABgDAAQgIAAAAgKg");
	this.shape_1.setTransform(2.55,-46.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgKAwQgCgEAAgKQAAgUAFgbQAEgcADgFQADgFAEAAQAGAAAAAHIgBAHIgFASIgEAWIgCATIABASIABADQAAAEgDACQgCADgDAAQgEAAgBgEg");
	this.shape_2.setTransform(-1.75,-46.075);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgVAcQgFgGAAgLQAAgPALgPQAMgPAMAAQAHABAEAEQAEAEAAAGQAAAKgKAJQgKAJgOADQgBAAAAAAQgBABAAAAQAAAAAAAAQAAABAAAAQAAADACACQADADAEAAQALAAALgMQADgDACABQADAAAAADQAAAHgKAIQgKAJgMAAQgKgBgGgGgAgDgOQgGAHgCAIQAJgBAGgGQAHgGAAgFIgBgDQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAAAAAAAQgGgBgFAIg");
	this.shape_3.setTransform(-6.925,-44.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgYAcQABgDACgCQACgCADAAIADABIAFABIAKgCQAHgCABgCQAAgDgKgFQgLgGgEgDQgCgEAAgFQAAgKALgIQAKgIAKAAQALAAAAAJQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBABIgDACIgCgBIgEgBQgEAAgHAEQgFADAAAFQAAAAAAABQAAABABAAQAAABAAAAQAAABABAAIAJAGQAJADADAEQAEAEAAAFQAAAIgMAGQgMAGgNAAQgKAAgBgIg");
	this.shape_4.setTransform(-12.75,-44.525);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgaAcQgCgEAAgLIAAgLIACgQIAAgEIABgIQABgCACgCQADgCADAAQADAAACACQAAABAAAAQABAAAAABQAAABAAAAQAAABAAAAIgCAMIgCAHIgBAIIABgBQAHgOAHgJQAIgJAIAAQAGAAAEADQADADAAAFQAAADgBACQAAAAgBABQAAAAgBAAQAAABgBAAQAAAAgBAAQgDAAgDgDIgEgCQgEAAgKANQgKANgCARQAAAFgDACQgCACgEAAQgEAAgBgFg");
	this.shape_5.setTransform(-17.475,-44.325);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AAPAaQgDgHAAgLQgGALgGAGQgHAGgIAAQgEAAgGgFQgEgFAAgKQAAgHADgNQAEgLAAgGQACgFAFAAQADAAACACQABAAAAABQABABAAAAQAAABAAAAQAAABAAAAQAAAFgDAHIgDANIgCAKQAAAIADAAQAFAAAIgKQAIgJADgKQADgKACgDQACgDAEAAQAGAAAAAGIgBAEQgDALAAAMQAAAPAEADQABAAAAABQAAAAABAAQAAABAAAAQAAAAAAABQAAACgDACIgFABQgFAAgCgGg");
	this.shape_6.setTransform(-24.95,-44.325);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgWAbQgGgHAAgJQAAgOAKgPQALgOAOAAQAKAAAGAHQAGAIAAAKIgBAHIAAABQgEANgLAKQgLAJgKAAQgJAAgFgGgAgBgRQgFAEgDAIQgEAHgBAIQABAEACAEQABADADAAQAHAAAHgJQAIgIAAgKQAAgGgDgEQgCgEgEAAQgFAAgCADg");
	this.shape_7.setTransform(-31.9,-44.375);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgQAvQgGgDgFgEQgEgEAAgDQAAgBAAgBQAAAAAAgBQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAABQAAAAABAAQAHAKAPAAQAEAAAGgMQAFgMACgQQgRANgKAAQgHAAgDgFQgEgFAAgGQAAgHADgOQAEgNACgDQACgEAGAAQAAAAABAAQAAABABAAQAAAAABABQAAAAABABQABACAAADIgEAKQgFALAAAIIABAGQAAABABAAQAAAAAAABQABAAAAAAQAAAAABAAIAGgBIAJgGQAFgEACgDIACgFIACgPIAAgJQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAgBABAAQAAAAABAAQAAgBABAAQAAAAABAAQAEAAACACQABACAAAGIgBATIgDAbQgDANgEALQgFALgFAEQgGAEgGAAQgIAAgHgDg");
	this.shape_8.setTransform(-39.125,-42.725);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgVAcQgFgGAAgLQAAgPALgPQAMgPAMAAQAHABAEAEQAEAEAAAGQAAAKgKAJQgKAJgOADQgBAAAAAAQAAABgBAAQAAAAAAAAQAAABAAAAQAAADACACQADADAEAAQALAAALgMQADgDACABQADAAAAADQAAAHgKAIQgKAJgMAAQgKgBgGgGgAgDgOQgGAHgCAIQAJgBAGgGQAHgGAAgFIgBgDQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAAAAAAAQgGgBgFAIg");
	this.shape_9.setTransform(-50.175,-44.5);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgZAqQgLgHAAgGQAAgEAFAAIAHADQAMAJAKAAQAHAAAEgJQAGgJACgXQgGAGgJAFQgIAEgGAAQgGAAgDgEQgEgDAAgFQAAgKAHgKQAHgLALgJQANgIAJAAQAGAAAEADIABABIACADIACAFIgDAHIgCAMIgEAcQgCAVgKAKQgIAJgLAAQgLAAgLgIgAAHggQgGAFgFAJQgHAJAAAGQAAAAABABQAAABAAAAQAAABABAAQAAAAAAAAQAIAAAGgHQAIgGAEgHQAFgIAAgFIgBgDIgDgBQgDAAgIAFg");
	this.shape_10.setTransform(-57.25,-42.6);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgkAWIABgMQADgMAAgSQAAgDADgDQACgDACAAQAEAAACABQACACAAAHQgBAGgDAPQANgdAPAAQANAAACAWQADAUADAAIADAAIAEgBQAAAAABAAQAAABAAAAQABAAAAABQAAABAAAAQAAADgEAEQgDADgGAAQgIAAgCgGQgDgFgCgOQgBgOgEAAQgEAAgJAOQgLAQgDAHIgCAEIgCABQgJAAAAgIg");
	this.shape_11.setTransform(-63.95,-44.325);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgVAcQgFgGAAgLQAAgPALgPQAMgPAMAAQAHABAEAEQAEAEAAAGQAAAKgKAJQgKAJgOADQgBAAAAAAQAAABgBAAQAAAAAAAAQAAABAAAAQAAADACACQADADAEAAQALAAALgMQADgDACABQADAAAAADQAAAHgKAIQgKAJgMAAQgKgBgGgGgAgDgOQgGAHgCAIQAJgBAGgGQAHgGAAgFIgBgDQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAAAAAAAQgGgBgFAIg");
	this.shape_12.setTransform(-71.175,-44.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgLAwQgBgEAAgKQAAgUAFgbQAEgcADgFQADgFADAAQAHAAAAAHIgBAHIgFASIgEAWIgBATIABASIAAADQAAAEgDACQgBADgDAAQgEAAgDgEg");
	this.shape_13.setTransform(-75.6,-46.075);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgLAwQgBgEAAgKQAAgUAFgbQAFgcACgFQADgFADAAQAHAAAAAHIgBAHIgFASIgEAWIgBATIAAASIABADQAAAEgDACQgCADgDAAQgDAAgDgEg");
	this.shape_14.setTransform(-79,-46.075);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AAMAMQgOATgPAAQgFAAgEgDQgEgFAAgGQAAgPAOgRQAOgRANAAQAHgBACAIQAHAAAAAEIgBAJQgCAMAAAHIABALIABADIACACQABABABAAQAAAAAAABQABAAAAABQAAAAAAABQAAADgDABQgDACgEAAQgKABABgWgAgGgHQgKAMAAAJQAAAFACAAQAHAAAJgNQAKgLAAgJQAAgBAAAAQAAgBAAAAQAAgBAAAAQgBgBAAgBQAAAAgBAAQAAAAAAgBQgBAAAAAAQgBAAAAAAQgGAAgIANg");
	this.shape_15.setTransform(-84.65,-44.45);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgfAwQgDgCAAgDIACgKQAGggAEgiQABgJACgDQADgDACAAQADAAADACQACADAAAEIgCAPIgGAaIgDASQAJgSAHgGQAHgGAHAAQAFAAADADQADAEACANIABALIADAIIADAGIACAEIgCAEIgFACQgFAAgEgGQgEgGgBgKIgCgPQAAgBAAgBQgBAAAAgBQgBAAAAgBQgBAAAAAAQgEAAgJAOQgJANgFAJIgEAIQAAAAgBAAQAAABgBAAQAAAAgBAAQAAAAgBAAQgDAAgCgBg");
	this.shape_16.setTransform(-91.825,-46.075);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgcAoQgJgGAAgOQAAgNAJgQQAJgQAOgLQANgLANABQAIAAAFAEQAEAFAAAGIgBAKQgBADgDACQgEADgCgBQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAIABgGIABgGQAAgEgDAAQgIAAgLAJQgJAJgIANQgHANAAAKQAAAHAEAEQADAFAIAAIAKgCQAHgCAGgEQAGgFACAAQAEAAAAAFQAAAFgNAIQgNAHgLAAQgKABgJgIg");
	this.shape_17.setTransform(-99.575,-45.6);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgYAcQAAgDADgCQACgCADAAIAEABIADABIALgCQAHgCABgCQAAgDgKgFQgLgGgEgDQgDgEAAgFQAAgKAMgIQALgIAKAAQAJAAABAJQAAAAgBABQAAABAAAAQAAAAgBABQAAAAAAABIgFACIgBgBIgDgBQgFAAgHAEQgFADAAAFQAAAAAAABQAAABAAAAQABABAAAAQAAABABAAIAJAGQAKADACAEQAEAEAAAFQAAAIgMAGQgLAGgNAAQgMAAAAgIg");
	this.shape_18.setTransform(34.7,-67.675);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgaAcQgCgEAAgLIAAgLIACgQIAAgEIABgIQABgCACgCQADgCADAAQADAAACACQAAABAAAAQABAAAAABQAAAAAAABQAAABAAAAIgCAMIgCAHIgBAIIABgBQAHgOAHgJQAIgJAIAAQAGAAAEADQADADAAAFQAAADgBACQAAAAgBABQAAAAgBAAQAAAAgBABQAAAAgBAAQgDAAgDgDIgEgCQgEAAgKANQgKANgCARQAAAFgDACQgCACgEAAQgEAAgBgFg");
	this.shape_19.setTransform(29.975,-67.475);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AAOAaQgCgHAAgLQgGALgGAGQgIAGgHAAQgEAAgFgFQgFgFAAgKQAAgHAEgNQADgLAAgGQACgFAFAAQADAAACACQABAAAAABQABABAAAAQAAABAAAAQABABAAAAQgBAFgDAHIgDANIgCAKQAAAIADAAQAFAAAIgKQAJgJACgKQADgKACgDQACgDAEAAQAGAAAAAGIgBAEQgDALgBAMQAAAPAGADQAAAAAAABQAAAAABAAQAAABAAAAQAAAAAAABQAAAAAAABQAAAAgBABQAAAAgBABQAAAAgBABIgFABQgFAAgDgGg");
	this.shape_20.setTransform(22.5,-67.475);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AgWAbQgGgHAAgJQAAgOAKgPQALgOANAAQALAAAGAHQAGAIAAAKIgBAHIAAABQgEANgLAKQgLAJgKAAQgIAAgGgGgAgBgRQgFAEgEAIQgDAHAAAIQAAAEACAEQABADADAAQAHAAAHgJQAIgIAAgKQAAgGgCgEQgDgEgEAAQgFAAgCADg");
	this.shape_21.setTransform(15.55,-67.525);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgSAdQAAgEgFgNQgKgYAAgLQABgJAHgBQAIABAAAIIAAAIIACAJIACAJIADAHIABADIACgEIAIgNIAMgTIAIgIQADgBADAAQACAAACABQACADABACQgBAEgFAEQgEADgIALQgJALgIASQgGAKgEAAQgDAAgEgFg");
	this.shape_22.setTransform(9.3,-67.45);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgaAcQgCgEAAgLIAAgLIACgQIAAgEIABgIQABgCACgCQADgCADAAQADAAACACQAAABAAAAQABAAAAABQAAAAAAABQAAABAAAAIgCAMIgCAHIgBAIIABgBQAHgOAHgJQAIgJAIAAQAGAAAEADQADADAAAFQAAADgBACQgBAAAAABQAAAAgBAAQAAAAgBABQAAAAgBAAQgDAAgDgDIgEgCQgEAAgKANQgKANgCARQAAAFgDACQgCACgEAAQgEAAgBgFg");
	this.shape_23.setTransform(3.275,-67.475);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgVAcQgFgGAAgLQAAgQALgOQAMgPAMAAQAHABAEAEQAEAEAAAGQAAAKgKAJQgKAIgOAEQgBAAAAAAQgBABAAAAQAAAAAAAAQAAABAAAAQAAADACACQADADAEAAQALAAALgMQADgCACAAQADAAAAADQAAAHgKAIQgKAJgMAAQgKAAgGgHgAgDgOQgGAHgCAIQAJgBAGgGQAHgGAAgFIgBgDQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAgBAAAAQgGAAgFAIg");
	this.shape_24.setTransform(-3.525,-67.65);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AgkAWIABgMQADgMAAgSQAAgDACgDQADgDADAAQADAAABABQACACAAAHQABAGgEAPQANgdAOAAQAOAAADAWQACAUADAAIADAAIADgBQABAAABAAQAAABAAAAQABAAAAABQAAAAAAABQAAADgEAEQgEADgGAAQgGAAgDgGQgDgFgCgOQAAgOgFAAQgEAAgKAOQgKAQgCAHIgCAEIgDABQgJAAAAgIg");
	this.shape_25.setTransform(-10.45,-67.475);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AgVAcQgFgGAAgLQAAgQALgOQAMgPAMAAQAHABAEAEQAEAEAAAGQAAAKgKAJQgKAIgOAEQgBAAAAAAQAAABgBAAQAAAAAAAAQAAABAAAAQAAADACACQADADAEAAQALAAALgMQADgCACAAQADAAAAADQAAAHgKAIQgKAJgMAAQgKAAgGgHgAgDgOQgGAHgCAIQAJgBAGgGQAHgGAAgFIgBgDQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAgBAAAAQgGAAgFAIg");
	this.shape_26.setTransform(-22.475,-67.65);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AgVAyQgEgDgBgEIAAgDIgCgCQgCgCAAgCIACgQIAFgXQAFghADgHQACgGAHAAQAEAAAAAIQAAAHgEARIgGAbQAGgJAIgGQAJgGAGABQAGgBADAFQAFAEAAAGQgBASgOAQQgNAQgPAAQgEAAgFgCgAgFANQgMANAAAJQADAFADAAQAFAAAGgFQAHgGAFgJQAFgIgBgHQABgFgCAAQgKAAgKANg");
	this.shape_27.setTransform(-28.9,-69.6);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgWAbQgGgHAAgJQAAgOALgPQAKgOANAAQAKAAAHAHQAGAIAAAKIgBAHIAAABQgEANgLAKQgLAJgKAAQgIAAgGgGgAgCgRQgEAEgDAIQgFAHAAAIQAAAEACAEQACADADAAQAHAAAHgJQAIgIAAgKQAAgGgDgEQgCgEgFAAQgEAAgDADg");
	this.shape_28.setTransform(-40.75,-67.525);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AgPAnQgFgEAAgJQABgIAFgWIgFAAIgBAAIgFgCQgDgCAAgDQAAgFAFAAIANgBIAFgSQACgIAFAAQADAAABACQABABAAAAQABABAAAAQAAABAAABQABAAAAABIgGASIAVgCIAEABIABAEQAAAFgJABIgUAEIgDAMIgCAQIABAGQAAABABAAQAAAAAAABQABAAAAAAQABAAAAAAIAFgBIAIgFQADgDADAAIADABIAAADQAAAFgIAGQgIAHgJAAQgHAAgEgFg");
	this.shape_29.setTransform(-46.7,-68.625);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AgfAtQgEgEAAgIQAAgPAMgQQANgNAMAAQAHAAADADIAFgYIADgMQACgCACgCIAEgCQADAAACADQABADAAADIgCAJIgIAfQgEARAAALQAAAKAFAAIAFgBIADgBQABAAABAAQAAAAABAAQAAABAAAAQAAABAAAAQAAAFgGAEQgGAEgFAAQgFAAgDgGQgDgHAAgIQgOAVgPABQgGgBgEgFgAgNAKQgJAMAAAKQAAAFAFAAQAHAAAKgMQAJgMAAgIQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBgBAAAAQgCgBgDAAQgHAAgIAKg");
	this.shape_30.setTransform(-58.475,-69.35);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AgVAcQgFgGAAgLQAAgQALgOQAMgPAMAAQAHABAEAEQAEAEAAAGQAAAKgKAJQgKAIgOAEQgBAAAAAAQAAABgBAAQAAAAAAAAQAAABAAAAQAAADACACQADADAEAAQALAAALgMQADgCACAAQADAAAAADQAAAHgKAIQgKAJgMAAQgKAAgGgHgAgDgOQgGAHgCAIQAJgBAGgGQAHgGAAgFIgBgDQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAgBAAAAQgGAAgFAIg");
	this.shape_31.setTransform(-65.475,-67.65);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AgVAcQgFgGAAgLQAAgQALgOQAMgPAMAAQAHABAEAEQAEAEAAAGQAAAKgKAJQgKAIgOAEQgBAAAAAAQAAABgBAAQAAAAAAAAQAAABAAAAQAAADACACQADADAEAAQALAAALgMQADgCACAAQADAAAAADQAAAHgKAIQgKAJgMAAQgKAAgGgHgAgDgOQgGAHgCAIQAJgBAGgGQAHgGAAgFIgBgDQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAgBAAAAQgGAAgFAIg");
	this.shape_32.setTransform(-71.675,-67.65);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AgkAWIABgMQADgMAAgSQAAgDADgDQACgDACAAQAEAAACABQABACAAAHQAAAGgDAPQANgdAPAAQANAAADAWQACAUADAAIADAAIADgBQABAAABAAQAAABAAAAQABAAAAABQAAAAAAABQAAADgEAEQgEADgFAAQgIAAgCgGQgDgFgCgOQgBgOgEAAQgEAAgKAOQgKAQgCAHIgDAEIgCABQgJAAAAgIg");
	this.shape_33.setTransform(-78.6,-67.475);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AgWAbQgGgHAAgJQAAgOALgPQAKgOAOAAQAJAAAHAHQAGAIAAAKIgBAHIAAABQgEANgLAKQgLAJgKAAQgJAAgFgGgAgBgRQgFAEgDAIQgFAHAAAIQAAAEADAEQABADADAAQAHAAAHgJQAIgIAAgKQAAgGgDgEQgCgEgEAAQgFAAgCADg");
	this.shape_34.setTransform(-90.95,-67.525);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AgoAsQgBgCAAgGQAAgFACgJIAAAAIAFgUQAEgWAAgJIABgHIADgDIAFgBIAFABQABABACAGQADALAKAQQAJAQAIAKIAFgZIAEgUIACgMQAAgFADgCIAFgCQABAAAAAAQABABAAAAQABAAAAABQABAAAAABQACACAAAEQAAAEgCAFQgEAOgDAUIgDAYIAAACIgBAFIgDADQgCACgEAAIgDgBIgDgCIgDgFIgEgHQgNgSgNgWQgCAHgDAaIgBAFIgBAIQAAAGgDADQgDADgCAAQgEAAgCgCg");
	this.shape_35.setTransform(-99,-68.625);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#000000").ss(2,1,1).p("AiFEYQgZk/Emjw");
	this.shape_36.setTransform(-119.5941,-5.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-134.2,-81.7,183.2,104.7);


(lib.Text5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgMAjQAAgCACgEQADgDADAAQABAAAAAAQABAAAAABQABAAABAAQAAABAAAAIADADIgBAEQAAAEgCACIgGACQgGAAAAgIgAgHAOQgBgMADgLQADgNAAgGIABgGQAAgEACgCQADgCADAAIAEACQABAAAAABQABAAAAABQAAAAAAABQAAAAAAAAIgCAMIgFAUIgDANQAAAFgCADQgEAAgEgCg");
	this.shape.setTransform(30.525,-45.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgPAnQgEgEgBgJQAAgIAHgWIgGAAIgBAAIgGgCQgCgCAAgDQAAgFAGAAIAMgBIAFgSQACgIAFAAQADAAABACQABABAAAAQABABAAAAQAAABAAABQAAAAAAABIgEASIAUgCIAEABIABAEQAAAFgJABIgUAEIgDAMIgCAQIABAGQAAABABAAQAAAAAAABQABAAAAAAQABAAAAAAIAGgBIAIgFQACgDACAAIAEABIABADQAAAFgJAGQgIAHgIAAQgIAAgEgFg");
	this.shape_1.setTransform(26,-45.475);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgPAlQAAgKACgOIACgGIACgLQAAgEACgDQACgDADAAQADAAACABQACADAAACIgCAIIAAACQgDALAAAHIAAAMIAAAKIAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAgBABQgCACgDAAQgIAAAAgMgAAAghQgCgCAAgDQAAgEACgDQACgDAGAAQADAAACADQADACAAADQAAAEgEADQgDADgDABQgDgBgDgDg");
	this.shape_2.setTransform(21.8,-45.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgWAbQgGgHAAgJQAAgOALgPQAKgOANAAQAKAAAHAHQAGAIAAAKIgBAHIAAABQgEANgLAKQgLAJgKAAQgJAAgFgGgAgCgRQgDAEgFAIQgEAHAAAIQAAAEACAEQACADADAAQAHAAAHgJQAIgIAAgKQAAgGgDgEQgCgEgFAAQgEAAgDADg");
	this.shape_3.setTransform(11.35,-44.375);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgfAtQgEgEAAgIQAAgPAMgQQANgOAMABQAHAAADADIAFgXIADgNQACgDACgBIAEgBQADAAACACQABADAAADIgCAKIgIAeQgEARAAAKQAAALAFAAIAFgCIADgBQABAAABABQAAAAABAAQAAABAAAAQAAABAAAAQAAAFgGAEQgGAEgFAAQgFAAgDgGQgDgGAAgJQgOAVgPABQgGAAgEgGgAgNAKQgJANAAAJQAAAGAFgBQAHAAAKgMQAJgMAAgIQAAgBAAAAQgBgBAAAAQAAgBAAAAQgBgBAAAAQgCgBgDAAQgHAAgIAKg");
	this.shape_4.setTransform(4.025,-46.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgkAWIABgMQADgMAAgSQAAgDADgDQACgDACAAQAEAAACABQABACAAAHQAAAGgDAPQANgdAPAAQANAAADAWQACAUADAAIADAAIAEgBQAAAAABAAQAAABAAAAQABAAAAABQAAABAAAAQAAADgEAEQgEADgFAAQgIAAgCgGQgDgFgCgOQgBgOgEAAQgEAAgJAOQgLAQgDAHIgCAEIgCABQgJAAAAgIg");
	this.shape_5.setTransform(-8.5,-44.325);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AAMAMQgPATgOAAQgFAAgEgDQgEgFAAgGQAAgPAOgRQAOgRANAAQAHgBACAIQAHAAAAAEIgCAJQgCAMAAAHIABALIACADIADACQAAABABAAQAAAAAAABQABAAAAABQAAAAAAABQAAADgDABQgDACgDAAQgMABACgWgAgGgHQgJAMAAAJQAAAFACAAQAGAAAKgNQAKgLAAgJQAAgBgBAAQAAgBAAAAQAAgBAAAAQgBgBAAgBQAAAAgBAAQAAAAAAgBQgBAAAAAAQAAAAgBAAQgGAAgIANg");
	this.shape_6.setTransform(-16.2,-44.45);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgUAdQgFgFAAgJQAAgPAMgQQAMgSALAAQAFAAAEAHQAEAFAAAGQAAAFgCACQAAABgBAAQgBABAAAAQgBAAAAAAQgBAAAAAAQgFABgBgJQgBgFgCAAQgFAAgHAMQgHAMAAALQAAAHAIABQAJgBAJgGQAFgDACgBQABAAABABQABAAAAAAQABABAAAAQAAABAAABQAAAFgLAGQgKAIgKAAQgKAAgFgGg");
	this.shape_7.setTransform(-22.75,-44.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AAPAaQgDgHAAgLQgGALgGAGQgIAGgHAAQgFAAgFgFQgEgFAAgKQAAgHADgNQADgLAAgGQADgFAFAAQAEAAACACQAAAAAAABQABABAAAAQAAABAAAAQAAABAAAAQAAAFgCAHIgEANIgCAKQAAAIADAAQAFAAAIgKQAIgJADgKQADgKACgDQACgDADAAQAHAAAAAGIgBAEQgDALAAAMQAAAPAEADQABAAAAABQAAAAABAAQAAABAAAAQAAAAAAABQAAACgDACIgGABQgEAAgCgGg");
	this.shape_8.setTransform(-34.25,-44.325);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgWAbQgGgHAAgJQAAgOALgPQAKgOANAAQAKAAAHAHQAGAIAAAKIgBAHIAAABQgEANgLAKQgLAJgKAAQgIAAgGgGgAgCgRQgEAEgDAIQgFAHAAAIQAAAEACAEQACADADAAQAHAAAHgJQAIgIAAgKQAAgGgDgEQgCgEgFAAQgEAAgDADg");
	this.shape_9.setTransform(-41.2,-44.375);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgQAvQgGgDgFgEQgEgEAAgDQAAgBAAgBQAAAAAAgBQAAAAABgBQAAAAAAgBQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQAHAKAPAAQAEAAAGgMQAFgMACgQQgRANgKAAQgHAAgDgFQgEgFAAgGQAAgHADgOQAEgNACgDQACgEAGAAQAAAAABAAQABABAAAAQABAAAAABQAAAAABABQABACAAADIgEAKQgFALAAAIIABAGQABABAAAAQAAAAAAABQABAAAAAAQAAAAABAAIAGgBIAJgGQAFgEACgDIACgFIACgPIAAgJQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAgBABAAQAAAAABAAQAAgBABAAQABAAAAAAQAEAAACACQABACAAAGIgBATIgDAbQgDANgEALQgFALgFAEQgGAEgGAAQgIAAgHgDg");
	this.shape_10.setTransform(-48.425,-42.725);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgVAcQgFgGAAgLQAAgPALgPQAMgPAMAAQAHABAEAEQAEAEAAAGQAAAKgKAJQgKAJgOADQgBAAAAAAQAAABgBAAQAAAAAAAAQAAABAAAAQAAADACACQADADAEAAQALAAALgMQADgDACABQADAAAAADQAAAHgKAIQgKAJgMAAQgKgBgGgGgAgDgOQgGAHgCAIQAJgBAGgGQAHgGAAgFIgBgDQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAAAAAAAQgGgBgFAIg");
	this.shape_11.setTransform(-59.475,-44.5);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgSAdQAAgEgFgMQgKgZAAgKQABgKAHAAQAIAAAAAJIAAAHIACAJIACAKIACAGIACAEIACgFIAIgNIAMgSIAIgIQACgCAEAAQACAAACACQACACAAACQAAAEgEADQgFADgJANQgIAKgJASQgFAKgEAAQgDAAgEgFg");
	this.shape_12.setTransform(-65.5,-44.3);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgVAcQgFgGAAgLQAAgPALgPQAMgPAMAAQAHABAEAEQAEAEAAAGQAAAKgKAJQgKAJgOADQgBAAAAAAQAAABgBAAQAAAAAAAAQAAABAAAAQAAADACACQADADAEAAQALAAALgMQADgDACABQADAAAAADQAAAHgKAIQgKAJgMAAQgKgBgGgGgAgDgOQgGAHgCAIQAJgBAGgGQAHgGAAgFIgBgDQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAAAAAAAQgGgBgFAIg");
	this.shape_13.setTransform(-72.225,-44.5);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgPAlQAAgKACgOIACgGIACgLQAAgEABgDQADgDADAAQADAAACABQADADAAACIgDAIIAAACQgDALAAAHIAAAMIAAAKIAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAgBABQgDACgDAAQgHAAAAgMgAAAghQgCgCAAgDQAAgEACgDQACgDAGAAQADAAACADQADACAAADQAAAEgEADQgEADgCABQgDgBgDgDg");
	this.shape_14.setTransform(-76.55,-45.95);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgLAwQgBgEAAgKQAAgUAFgbQAEgcADgFQADgFADAAQAHAAAAAHIgBAHIgFASIgEAWIgBATIABASIAAADQAAAEgDACQgBADgDAAQgEAAgDgEg");
	this.shape_15.setTransform(-80.1,-46.075);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgVAcQgFgGAAgLQAAgPALgPQAMgPAMAAQAHABAEAEQAEAEAAAGQAAAKgKAJQgKAJgOADQgBAAAAAAQAAABgBAAQAAAAAAAAQAAABAAAAQAAADACACQADADAEAAQALAAALgMQADgDACABQADAAAAADQAAAHgKAIQgKAJgMAAQgKgBgGgGgAgDgOQgGAHgCAIQAJgBAGgGQAHgGAAgFIgBgDQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAAAAAAAQgGgBgFAIg");
	this.shape_16.setTransform(-85.275,-44.5);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgVAyQgEgDAAgEIgBgDIgCgBQgCgCAAgEIACgPIAFgXQAFgiADgGQACgGAHAAQAEAAAAAJQAAAGgEARIgHAbQAIgJAHgGQAIgFAIAAQAFAAAEAEQADAFAAAFQAAASgOAQQgOAQgOAAQgFAAgEgCgAgFANQgLAOAAAIQACAFADAAQAGAAAFgFQAHgGAFgIQAFgJgBgHQAAgFgBAAQgKAAgKANg");
	this.shape_17.setTransform(-91.7,-46.45);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgJAoQgCgEAAgIIADgbIADgWIACgJIABgIIADgDIAEgCQADAAACADQACADAAAEIgEASIgCAIIgBAIIgCARIABAPQABAGgDACQgCADgDAAQgEAAgCgEg");
	this.shape_18.setTransform(-101.875,-45.525);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgPAnQgFgEAAgJQABgIAFgWIgEAAIgCAAIgFgCQgDgCAAgDQAAgFAFAAIANgBIAFgSQACgIAFAAQADAAABACQABABAAAAQABABAAAAQAAABAAABQABAAAAABIgGASIAVgCIAEABIABAEQAAAFgJABIgUAEIgDAMIgCAQIABAGQAAABABAAQAAAAAAABQABAAAAAAQABAAABAAIAEgBIAIgFQAEgDACAAIACABIABADQAAAFgIAGQgIAHgJAAQgHAAgEgFg");
	this.shape_19.setTransform(42.5,-68.625);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgkAWIABgMQADgMAAgSQAAgDADgDQACgDACAAQAEAAACABQABACAAAHQAAAGgDAPQANgdAPAAQANAAADAWQACAUADAAIADAAIADgBQABAAABAAQAAABAAAAQABAAAAABQAAAAAAABQAAADgEAEQgEADgFAAQgIAAgCgGQgDgFgCgOQgBgOgEAAQgEAAgKAOQgKAQgCAHIgDAEIgCABQgJAAAAgIg");
	this.shape_20.setTransform(35.7,-67.475);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AgVAcQgFgGAAgLQAAgQALgOQAMgPAMAAQAHABAEAEQAEAEAAAGQAAAKgKAJQgKAIgOAEQgBAAAAAAQAAABgBAAQAAAAAAAAQAAABAAAAQAAADACACQADADAEAAQALAAALgMQADgCACAAQADAAAAADQAAAHgKAIQgKAJgMAAQgKAAgGgHgAgDgOQgGAHgCAIQAJgBAGgGQAHgGAAgFIgBgDQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAgBAAAAQgGAAgFAIg");
	this.shape_21.setTransform(28.475,-67.65);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgfAtQgEgEAAgIQAAgPAMgQQANgNAMAAQAHAAADADIAFgYIADgMQACgCACgCIAEgCQADAAACADQABADAAADIgCAJIgIAfQgEARAAALQAAAKAFAAIAFgBIADgBQABAAABAAQAAAAABAAQAAABAAAAQAAABAAAAQAAAFgGAEQgGAEgFAAQgFAAgDgGQgDgHAAgIQgOAVgPABQgGgBgEgFgAgNAKQgJAMAAAKQAAAFAFAAQAHAAAKgMQAJgMAAgIQAAgBAAAAQgBgBAAAAQAAgBAAAAQgBgBAAAAQgCgBgDAAQgHAAgIAKg");
	this.shape_22.setTransform(21.375,-69.35);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AAOAaQgCgHAAgLQgGALgGAGQgHAGgIAAQgFAAgEgFQgFgFAAgKQAAgHAEgNQACgLAAgGQADgFAFAAQADAAADACQAAAAAAABQABABAAAAQAAABAAAAQABABAAAAQAAAFgEAHIgDANIgCAKQAAAIADAAQAFAAAIgKQAJgJACgKQADgKACgDQACgDADAAQAHAAAAAGIgBAEQgEALAAAMQABAPAFADQAAAAAAABQAAAAABAAQAAABAAAAQAAAAAAABQAAACgDACIgGABQgEAAgDgGg");
	this.shape_23.setTransform(13.7,-67.475);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgPAnQgEgEgBgJQAAgIAHgWIgGAAIgBAAIgGgCQgCgCAAgDQAAgFAGAAIAMgBIAFgSQACgIAFAAQADAAABACQABABAAAAQABABAAAAQAAABAAABQAAAAAAABIgEASIAUgCIAEABIABAEQAAAFgJABIgUAEIgDAMIgCAQIABAGQAAABABAAQAAAAAAABQABAAAAAAQABAAAAAAIAGgBIAIgFQACgDACAAIAEABIABADQAAAFgJAGQgIAHgIAAQgIAAgEgFg");
	this.shape_24.setTransform(7.55,-68.625);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AgYAcQAAgDADgCQACgCADAAIAEABIADABIALgCQAHgCABgCQAAgDgKgFQgLgGgEgDQgCgEgBgFQAAgKAMgIQALgIAKAAQAJAAABAJQAAAAgBABQAAABAAAAQAAAAgBABQAAAAAAABIgFACIgBgBIgDgBQgGAAgGAEQgFADAAAFQAAAAAAABQAAABAAAAQABABAAAAQAAABABAAIAJAGQAKADACAEQAEAEAAAFQAAAIgMAGQgLAGgNAAQgMAAAAgIg");
	this.shape_25.setTransform(1.85,-67.675);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AgPAnQgFgEAAgJQABgIAFgWIgEAAIgCAAIgFgCQgDgCAAgDQAAgFAFAAIANgBIAFgSQACgIAFAAQADAAABACQABABAAAAQABABAAAAQAAABAAABQABAAAAABIgGASIAVgCIAEABIABAEQAAAFgJABIgUAEIgDAMIgCAQIABAGQAAABABAAQAAAAAAABQABAAAAAAQABAAABAAIAEgBIAIgFQAEgDACAAIACABIABADQAAAFgIAGQgIAHgJAAQgHAAgEgFg");
	this.shape_26.setTransform(-7.9,-68.625);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AgXAcQAAgDACgCQACgCADAAIAEABIADABIAMgCQAFgCACgCQAAgDgKgFQgLgGgDgDQgEgEAAgFQAAgKAMgIQAKgIAKAAQALAAgBAJQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABIgFACIgCgBIgCgBQgFAAgGAEQgGADAAAFQAAAAAAABQAAABAAAAQABABAAAAQABABAAAAIAIAGQAKADAEAEQADAEAAAFQAAAIgLAGQgMAGgNAAQgLAAAAgIg");
	this.shape_27.setTransform(-13.6,-67.675);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgVAcQgFgGAAgLQAAgQALgOQAMgPAMAAQAHABAEAEQAEAEAAAGQAAAKgKAJQgKAIgOAEQgBAAAAAAQAAABgBAAQAAAAAAAAQAAABAAAAQAAADACACQADADAEAAQALAAALgMQADgCACAAQADAAAAADQAAAHgKAIQgKAJgMAAQgKAAgGgHgAgDgOQgGAHgCAIQAJgBAGgGQAHgGAAgFIgBgDQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAgBAAAAQgGAAgFAIg");
	this.shape_28.setTransform(-19.025,-67.65);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AgVAyQgEgDAAgEIgBgDIgBgCQgDgCAAgCIADgQIADgXQAGghADgHQACgGAHAAQAEAAAAAIQAAAHgEARIgHAbQAIgJAHgGQAIgGAIABQAFgBAEAFQADAEAAAGQABASgOAQQgOAQgPAAQgFAAgEgCgAgFANQgLANAAAJQACAFADAAQAFAAAGgFQAHgGAFgJQAFgIAAgHQAAgFgCAAQgKAAgKANg");
	this.shape_29.setTransform(-25.45,-69.6);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AgQAvQgGgDgFgEQgEgEAAgDQAAgBAAgBQAAAAAAgBQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAABQAAAAABAAQAHAKAPAAQAEAAAGgMQAFgMACgQQgRANgKAAQgHAAgDgFQgEgFAAgGQAAgHADgOQAEgNACgDQACgEAGAAQAAAAABAAQAAABABAAQAAAAABABQAAAAABABQABACAAADIgEAKQgFALAAAIIABAGQAAABABAAQAAAAAAABQABAAAAAAQAAAAABAAIAGgBIAJgGQAFgEACgDIACgFIACgPIAAgJQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAgBABAAQAAAAABAAQAAgBABAAQAAAAABAAQAEAAACACQABACAAAGIgBATIgDAbQgDANgEALQgFALgFAEQgGAEgGAAQgIAAgHgDg");
	this.shape_30.setTransform(-37.775,-65.875);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("Ag2AWQAAgSACgLIABgUQAAAAAAgBQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAABAAQAAgBAAAAQABAAABAAQAAAAABAAQAJAAAAAKIgDASIgCALQARgjANAAQAFAAAEAEQACAEAAAPQAAANACAAQABAAAGgNQAHgOAFgFQAFgEAFAAQAHAAADAFQADAGABANIACAPQACAFADACQADACAAACQAAADgDACQgDADgEAAQgGAAgDgGQgEgGgBgSIgBgKQAAgBgBAAQAAgBAAAAQAAAAgBgBQAAAAAAAAQgCAAgCAEIgJAQQgFALgEAFQgEAEgDAAQgDAAgEgDQgDgDgBgSQAAgPgCAAQgCAAgKANQgJAPgFALQAAAGgGAAQgIAAAAgLg");
	this.shape_31.setTransform(-46.725,-67.575);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AgVAcQgFgGAAgLQAAgQALgOQAMgPAMAAQAHABAEAEQAEAEAAAGQAAAKgKAJQgKAIgOAEQgBAAAAAAQAAABgBAAQAAAAAAAAQAAABAAAAQAAADACACQADADAEAAQALAAALgMQADgCACAAQADAAAAADQAAAHgKAIQgKAJgMAAQgKAAgGgHgAgDgOQgGAHgCAIQAJgBAGgGQAHgGAAgFIgBgDQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAgBAAAAQgGAAgFAIg");
	this.shape_32.setTransform(-60.825,-67.65);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AgaAcQgCgEAAgLIAAgLIACgQIAAgEIABgIQABgCACgCQADgCADAAQADAAACACQAAABAAAAQABAAAAABQAAAAAAABQAAABAAAAIgCAMIgCAHIgBAIIABgBQAHgOAHgJQAIgJAIAAQAGAAAEADQADADAAAFQAAADgBACQAAAAgBABQAAAAgBAAQAAAAgBABQAAAAgBAAQgDAAgDgDIgEgCQgEAAgKANQgKANgCARQAAAFgDACQgCACgEAAQgEAAgBgFg");
	this.shape_33.setTransform(-66.325,-67.475);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AAMAMQgPATgOABQgGAAgDgFQgEgEAAgGQAAgQAOgQQAOgRANAAQAHAAACAGQAHABAAAEIgBAJQgDAMAAAHIABAKIACAFIADABQAAABABAAQAAAAAAABQABAAAAABQAAAAAAAAQAAAEgDACQgDABgEAAQgLAAACgVgAgGgHQgJAMAAAJQAAAFABAAQAIAAAIgNQALgLgBgJQAAgBAAAAQAAgBAAAAQAAgBAAAAQgBgBAAgBQAAAAgBAAQAAAAAAgBQgBAAAAAAQgBAAAAAAQgFAAgJANg");
	this.shape_34.setTransform(-73.6,-67.6);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AAOAaQgCgHAAgLQgGALgGAGQgHAGgIAAQgEAAgFgFQgFgFAAgKQAAgHADgNQAEgLAAgGQACgFAFAAQADAAACACQABAAAAABQABABAAAAQAAABAAAAQAAABAAAAQAAAFgDAHIgDANIgCAKQAAAIADAAQAFAAAIgKQAJgJACgKQADgKACgDQACgDAEAAQAGAAAAAGIgBAEQgDALgBAMQAAAPAGADQAAAAAAABQAAAAABAAQAAABAAAAQAAAAAAABQAAAAAAABQAAAAgBABQAAAAgBABQAAAAgBABIgFABQgFAAgDgGg");
	this.shape_35.setTransform(-85.6,-67.475);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AgWAbQgGgHAAgJQAAgOAKgPQALgOAOAAQAKAAAGAHQAGAIAAAKIgBAHIAAABQgEANgLAKQgLAJgKAAQgIAAgGgGgAgBgRQgEAEgFAIQgDAHAAAIQAAAEACAEQABADADAAQAHAAAHgJQAIgIAAgKQAAgGgCgEQgDgEgEAAQgFAAgCADg");
	this.shape_36.setTransform(-92.55,-67.525);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AgMAlIACgPIACgPIgBgEIgMgOQgIgLgEgCQgGgFgCgDQAAgBgBAAQAAgBAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBAAAAQABgBAAAAQABgBABAAQAAAAABgBQAAAAABAAQAAAAABAAQAJAAATAZIAIAKIAEgFIAFgFQAOgPAEgHQAFgGAGAAQABAAAAAAQABAAAAAAQABABAAAAQABAAAAABQAAAAABABQAAAAAAABQABAAAAABQAAABAAAAQAAAEgWAWIgQARQgBAFgDAbIgBAHIgCACIgFABQgGAAAAgJg");
	this.shape_37.setTransform(-99.5,-68.775);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f().s("#000000").ss(2,1,1).p("AiFEYQgZk/Emjw");
	this.shape_38.setTransform(-119.5941,-5.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-134.2,-81.7,183.2,104.7);


(lib.Text4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgaAcQgCgEAAgLIAAgLIACgQIAAgEIABgIQABgCACgCQADgCADAAQADAAACACQAAABAAAAQABAAAAABQAAAAAAABQAAABAAAAIgCAMIgCAHIgBAIIABgBQAHgOAHgJQAIgJAIAAQAGAAAEADQADADAAAFQAAADgBACQAAAAgBABQAAAAgBAAQAAAAgBABQAAAAgBAAQgDAAgDgDIgEgCQgEAAgKANQgKANgCARQAAAFgDACQgCACgEAAQgEAAgBgFg");
	this.shape.setTransform(-32.025,-28.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgPAmQAAgLACgOIACgGIACgLQAAgEABgEQADgCADAAQADAAACABQADACAAADIgDAJIAAABQgDALAAAHIAAAMIAAAJIAAACQAAAAAAABQAAAAAAABQAAAAgBABQAAAAgBABQgDACgDAAQgHAAAAgLgAAAghQgCgCAAgEQAAgEACgCQACgDAGAAQADAAACADQADACAAADQAAAEgEADQgEADgCAAQgDAAgDgDg");
	this.shape_1.setTransform(-36.95,-29.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgYAcQABgDACgCQACgCADAAIADABIAFABIAKgCQAGgCACgCQAAgDgKgFQgLgGgEgDQgCgEAAgFQAAgKALgIQALgIAKAAQAJAAABAJQAAAAgBABQAAABAAAAQAAAAgBABQAAAAgBABIgEACIgBgBIgEgBQgEAAgHAEQgFADAAAFQAAAAAAABQAAABAAAAQABABAAAAQAAABABAAIAJAGQAKADACAEQAEAEAAAFQAAAIgMAGQgMAGgNAAQgKAAgBgIg");
	this.shape_2.setTransform(-41.9,-28.525);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgOAOIABgDIAIgDQAFgDAAgDIACgDQAAgFgBgCIgBgDIABgEQAAAAABgBQAAAAAAAAQABgBAAAAQAAAAABAAIAFACQABAAABAAQAAABABAAQAAAAAAABQABAAAAAAIABAFIABAGIgCAFQgCAGgEADQgEADgDAAIgBABIgJACQgEAAAAgEg");
	this.shape_3.setTransform(-51.025,-25.675);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgYAcQABgDACgCQACgCADAAIADABIAFABIAKgCQAGgCACgCQAAgDgKgFQgLgGgEgDQgCgEAAgFQAAgKALgIQALgIAKAAQAJAAABAJQAAAAgBABQAAABAAAAQAAAAgBABQAAAAgBABIgEACIgBgBIgEgBQgEAAgHAEQgFADAAAFQAAAAAAABQAAABAAAAQABABAAAAQAAABABAAIAJAGQAKADACAEQAEAEAAAFQAAAIgMAGQgMAGgNAAQgKAAgBgIg");
	this.shape_4.setTransform(-55.85,-28.525);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgaAcQgCgEAAgLIAAgLIACgQIAAgEIABgIQABgCACgCQADgCADAAQADAAACACQAAABAAAAQABAAAAABQAAAAAAABQAAABAAAAIgCAMIgCAHIgBAIIABgBQAHgOAHgJQAIgJAIAAQAGAAAEADQADADAAAFQAAADgBACQAAAAgBABQAAAAgBAAQAAAAgBABQAAAAgBAAQgDAAgDgDIgEgCQgEAAgKANQgKANgCARQAAAFgDACQgCACgEAAQgEAAgBgFg");
	this.shape_5.setTransform(-60.575,-28.325);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AAOAaQgCgHAAgLQgGALgGAGQgHAGgIAAQgEAAgFgFQgFgFAAgKQAAgHADgNQAEgLAAgGQACgFAFAAQADAAACACQABAAAAABQABABAAAAQAAABAAAAQAAABAAAAQAAAFgDAHIgDANIgCAKQAAAIADAAQAFAAAIgKQAJgJACgKQADgKACgDQACgDAEAAQAGAAAAAGIgBAEQgDALgBAMQAAAPAGADQAAAAAAABQAAAAABAAQAAABAAAAQAAAAAAABQAAAAAAABQAAAAgBABQAAAAgBABQAAAAgBABIgFABQgFAAgDgGg");
	this.shape_6.setTransform(-68.05,-28.325);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgWAbQgGgHAAgJQAAgOAKgPQALgOAOAAQAKAAAGAHQAGAIAAAKIgBAHIAAABQgEANgLAKQgLAJgKAAQgIAAgGgGgAgBgRQgEAEgFAIQgDAHAAAIQAAAEACAEQABADADAAQAHAAAHgJQAIgIAAgKQAAgGgCgEQgDgEgEAAQgFAAgCADg");
	this.shape_7.setTransform(-75,-28.375);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgSAdQAAgEgFgNQgKgYAAgLQABgJAHgBQAIABAAAIIAAAIIACAJIACAJIACAHIACADIACgEIAIgNIAMgTIAIgIQACgBAEAAQACAAACABQACADAAACQAAAEgEAEQgFADgJALQgIALgJASQgFAKgEAAQgDAAgEgFg");
	this.shape_8.setTransform(-81.25,-28.3);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgaAcQgCgEAAgLIAAgLIACgQIAAgEIABgIQABgCACgCQADgCADAAQADAAACACQAAABAAAAQABAAAAABQAAAAAAABQAAABAAAAIgCAMIgCAHIgBAIIABgBQAHgOAHgJQAIgJAIAAQAGAAAEADQADADAAAFQAAADgBACQgBAAAAABQAAAAgBAAQAAAAgBABQAAAAgBAAQgDAAgDgDIgEgCQgEAAgKANQgKANgCARQAAAFgDACQgCACgEAAQgEAAgBgFg");
	this.shape_9.setTransform(-87.275,-28.325);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgVAcQgFgGAAgLQAAgQALgOQAMgPAMAAQAHABAEAEQAEAEAAAGQAAAKgKAJQgKAIgOAEQgBAAAAAAQgBABAAAAQAAAAAAAAQAAABAAAAQAAADACACQADADAEAAQALAAALgMQADgCACAAQADAAAAADQAAAHgKAIQgKAJgMAAQgKAAgGgHgAgDgOQgGAHgCAIQAJgBAGgGQAHgGAAgFIgBgDQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAgBAAAAQgGAAgFAIg");
	this.shape_10.setTransform(-94.075,-28.5);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgkAWIABgMQADgMAAgSQAAgDADgDQACgDACAAQAEAAABABQACACAAAHQABAGgEAPQANgdAOAAQAOAAADAWQACAUADAAIADAAIADgBQABAAABAAQAAABAAAAQABAAAAABQAAAAAAABQAAADgEAEQgEADgFAAQgHAAgDgGQgDgFgCgOQAAgOgFAAQgEAAgKAOQgKAQgCAHIgDAEIgCABQgJAAAAgIg");
	this.shape_11.setTransform(-101,-28.325);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgPAnQgEgEgBgJQAAgIAHgWIgGAAIgBAAIgFgCQgDgCAAgDQAAgFAGAAIAMgBIAFgSQACgIAFAAQADAAABACQABABAAAAQABABAAAAQAAABAAABQAAAAAAABIgEASIAUgCIAEABIABAEQAAAFgJABIgUAEIgDAMIgCAQIABAGQAAABABAAQAAABAAAAQABAAAAAAQABAAAAAAIAGgBIAIgFQACgDACAAIAEABIABADQAAAFgJAGQgIAHgJAAQgHAAgEgFg");
	this.shape_12.setTransform(21.15,-52.625);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgPAmQAAgKACgPIACgGIACgLQAAgFACgDQACgCADAAQADAAACABQACADAAACIgCAJIAAABQgDALAAAIIAAALIAAAJIAAACQAAAAAAABQAAAAAAABQAAAAgBABQAAAAgBABQgCACgDAAQgIAAAAgLgAAAggQgCgDAAgEQAAgDACgDQACgDAGAAQADAAACACQADADAAADQAAAEgEAEQgEACgCAAQgDAAgDgCg");
	this.shape_13.setTransform(16.95,-53.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgVAxQgEgCgBgEIAAgDIgBgCQgCgCAAgCIACgQIADgXQAGgiACgGQADgGAGAAQAFAAAAAIQAAAGgFATIgFAaQAGgJAIgGQAJgGAGAAQAGAAADAFQAEAFABAFQAAASgOAQQgPAQgOAAQgEAAgFgDgAgFANQgMANAAAKQADAEADAAQAGAAAFgFQAHgFAFgKQAEgIABgHQgBgFgBAAQgJAAgLANg");
	this.shape_14.setTransform(11.4,-53.6);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgVAcQgFgGAAgLQAAgQALgOQAMgOAMAAQAHgBAEAFQAEAEAAAFQAAALgKAJQgKAJgOADQgBAAAAAAQAAAAgBABQAAAAAAAAQAAABAAAAQAAADACADQADACAEAAQALAAALgMQADgDACAAQADABAAAEQAAAFgKAJQgKAJgMgBQgKABgGgHgAgDgOQgGAIgCAHQAJgBAGgGQAHgGAAgFIgBgDQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAgBAAAAQgGABgFAHg");
	this.shape_15.setTransform(-0.125,-51.65);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgKAwQgCgEAAgKQAAgUAFgbQAEgcADgFQADgFAEAAQAGAAAAAHIgBAHIgFASIgEAWIgCATIABASIABADQAAAEgDACQgBADgEAAQgDAAgCgEg");
	this.shape_16.setTransform(-4.55,-53.225);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgPAnQgEgEgBgJQAAgIAHgWIgGAAIgBAAIgGgCQgCgCAAgDQAAgFAGAAIAMgBIAFgSQACgIAFAAQADAAABACQABABAAAAQABABAAAAQAAABAAABQAAAAAAABIgEASIAUgCIAEABIABAEQAAAFgJABIgUAEIgDAMIgCAQIABAGQAAABABAAQAAABAAAAQABAAAAAAQABAAAAAAIAGgBIAIgFQACgDACAAIAEABIABADQAAAFgJAGQgIAHgIAAQgIAAgEgFg");
	this.shape_17.setTransform(-9.55,-52.625);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgPAnQgEgEAAgJQgBgIAHgWIgGAAIgBAAIgGgCQgCgCAAgDQAAgFAGAAIAMgBIAFgSQACgIAEAAQAEAAACACQAAABAAAAQABABAAAAQAAABAAABQAAAAAAABIgEASIAUgCIAEABIABAEQAAAFgJABIgUAEIgCAMIgDAQIABAGQAAABABAAQAAABAAAAQABAAAAAAQABAAAAAAIAGgBIAIgFQADgDABAAIADABIACADQAAAFgJAGQgIAHgIAAQgIAAgEgFg");
	this.shape_18.setTransform(-15.15,-52.625);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgPAmQAAgKACgPIACgGIABgLQAAgFADgDQABgCAEAAQADAAACABQADADgBACIgCAJIAAABQgDALAAAIIgBALIABAJIAAACQAAAAAAABQAAAAAAABQAAAAgBABQAAAAgBABQgDACgCAAQgIAAAAgLgAAAggQgCgDAAgEQAAgDACgDQADgDAEAAQAEAAACACQADADAAADQAAAEgDAEQgEACgDAAQgEAAgCgCg");
	this.shape_19.setTransform(-19.35,-53.1);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgKAwQgCgEAAgKQAAgUAFgbQAEgcADgFQADgFAEAAQAGAAAAAHIgBAHIgFASIgEAWIgCATIABASIABADQAAAEgDACQgCADgDAAQgEAAgBgEg");
	this.shape_20.setTransform(-22.9,-53.225);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AAMALQgOAVgPAAQgFAAgEgFQgEgEAAgGQAAgQAOgQQAOgRANgBQAHABACAGQAHAAAAAGIgBAJQgCALAAAHIABAKIABAFIACACQABAAABAAQAAAAAAABQABAAAAABQAAAAAAAAQAAAEgDACQgDACgEAAQgKAAABgXgAgGgHQgKAMAAAJQAAAFACAAQAHAAAJgMQAKgLAAgKQAAgBAAAAQAAgBAAAAQAAgBAAAAQgBgBAAgBQAAAAgBAAQAAAAAAgBQgBAAAAAAQgBAAAAAAQgGAAgIANg");
	this.shape_21.setTransform(-33.35,-51.6);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgVAcQgFgGAAgLQAAgQALgOQAMgOAMAAQAHgBAEAFQAEAEAAAFQAAALgKAJQgKAJgOADQgBAAAAAAQAAAAgBABQAAAAAAAAQAAABAAAAQAAADACADQADACAEAAQALAAALgMQADgDACAAQADABAAAEQAAAFgKAJQgKAJgMgBQgKABgGgHgAgDgOQgGAIgCAHQAJgBAGgGQAHgGAAgFIgBgDQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAgBAAAAQgGABgFAHg");
	this.shape_22.setTransform(-44.675,-51.65);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgVAxQgEgCAAgEIgBgDIgBgCQgDgCAAgCIADgQIADgXQAGgiADgGQACgGAHAAQAEAAAAAIQAAAGgEATIgHAaQAIgJAHgGQAIgGAIAAQAFAAAEAFQADAFAAAFQABASgOAQQgOAQgPAAQgFAAgEgDgAgFANQgLANAAAKQACAEADAAQAFAAAGgFQAHgFAFgKQAFgIAAgHQAAgFgCAAQgKAAgKANg");
	this.shape_23.setTransform(-51.1,-53.6);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgfAuQgEgGAAgHQAAgPAMgQQANgOAMAAQAHAAADAFIAFgZIADgLQACgDACgCIAEgCQADABACACQABACAAAEIgCAJIgIAfQgEARAAALQAAAKAFAAIAFgBIADgBQABAAABAAQAAAAAAAAQABABAAAAQAAABAAABQAAAEgGAEQgGAEgFAAQgFAAgDgGQgDgGAAgJQgOAVgPAAQgGAAgEgEgAgNALQgJAMAAAJQAAAFAFABQAHAAAKgNQAJgNAAgHQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBgBAAAAQgCgBgDAAQgHAAgIALg");
	this.shape_24.setTransform(-63.525,-53.35);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AgLAwQgBgEAAgKQAAgUAFgbQAFgcACgFQADgFADAAQAHAAAAAHIgBAHIgFASIgEAWIgBATIABASIAAADQAAAEgDACQgCADgDAAQgEAAgCgEg");
	this.shape_25.setTransform(-68.75,-53.225);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AAOAaQgCgHAAgLQgGALgGAGQgIAGgHAAQgFAAgEgFQgFgFAAgKQAAgHAEgNQACgLAAgGQADgFAFAAQAEAAABACQABAAAAABQABABAAAAQAAABAAAAQABABAAAAQAAAFgEAHIgDANIgCAKQAAAIADAAQAFAAAIgKQAJgJACgKQADgKACgDQACgDADAAQAHAAAAAGIgBAEQgDALgBAMQAAAPAGADQAAAAAAABQAAAAABAAQAAABAAAAQAAAAAAABQAAAAAAABQAAAAgBABQAAAAgBABQAAAAgBABIgGABQgEAAgDgGg");
	this.shape_26.setTransform(-74.6,-51.475);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AgWAbQgGgHAAgJQAAgOAKgPQALgOANAAQALAAAGAHQAGAIAAAKIgBAHIAAABQgEANgLAKQgLAJgKAAQgIAAgGgGgAgCgRQgDAEgFAIQgDAHAAAIQAAAEABAEQACADADAAQAHAAAHgJQAIgIAAgKQAAgGgCgEQgDgEgFAAQgEAAgDADg");
	this.shape_27.setTransform(-81.55,-51.525);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgUAeQgFgGAAgJQAAgPAMgQQAMgRALAAQAFAAAEAFQAEAGAAAGQAAAFgCADQAAAAgBAAQgBABAAAAQgBAAAAAAQgBABAAAAQgFgBgBgHQgBgHgCAAQgFABgHANQgHALAAAKQAAAJAIgBQAJABAJgIQAFgDACAAQABAAABABQABAAAAAAQABABAAAAQAAABAAAAQAAAGgLAHQgKAGgKAAQgKAAgFgEg");
	this.shape_28.setTransform(-88,-51.65);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AgPAnQgFgEAAgJQABgIAFgWIgEAAIgCAAIgFgCQgDgCAAgDQAAgFAFAAIANgBIAFgSQACgIAFAAQADAAABACQABABAAAAQABABAAAAQAAABAAABQABAAAAABIgGASIAVgCIAEABIABAEQAAAFgJABIgUAEIgDAMIgCAQIABAGQAAABABAAQAAABAAAAQABAAAAAAQABAAABAAIAEgBIAIgFQAEgDACAAIACABIABADQAAAFgIAGQgIAHgJAAQgHAAgEgFg");
	this.shape_29.setTransform(-98.35,-52.625);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AgJAoQgCgEAAgIIADgbIADgWIACgJIABgIIADgDIAEgCQADAAACADQACADAAAEIgEASIgCAIIgBAIIgCARIABAPQABAGgDACQgCADgDAAQgEAAgCgEg");
	this.shape_30.setTransform(-103.075,-52.675);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#000000").ss(2,1,1).p("ACHEYQjzhLgank");
	this.shape_31.setTransform(3.3,-5.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-107.2,-65.7,155,89.2);


(lib.Text3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgYAsQgCgCAAgEQAAgCAEgEIACgBIAEgBIAFACQAFAAAAAFQAAAEgEACQgEADgEAAQgDAAgDgCgAgSATIgBgFIABgFIAEgJIAGgEIAJgEIAIgDIAEgEIABgGIgBgFIgCgEIgDgCIgEgBQgFAAgCACQgBABAAAAQgBAAAAABQAAAAgBABQAAAAAAAAQgBAFgIAAQgFAAAAgFQAAgDADgEQADgEAGgDQAEgCAEgBIAHAAQAGAAAEADQAGAEACAEQACADAAAIQAAAJgDAGQgEAFgFACIgSAHIgDAJQAAADgCACQgDABgFAAQAAAAAAAAQgBAAAAAAQAAAAgBgBQAAAAAAgBg");
	this.shape.setTransform(-3.075,-45.9286);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgLAwQgBgEAAgKQAAgUAFgbQAFgcACgFQADgFADAAQAHAAAAAHIgBAHIgFASIgEAWIgBATIAAASIABADQAAAEgDACQgCADgDAAQgDAAgDgEg");
	this.shape_1.setTransform(-7.9,-46.325);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgVAcQgFgGAAgLQAAgPALgPQAMgPAMAAQAHAAAEAFQAEAEAAAFQAAALgKAJQgKAIgOAEQgBAAAAAAQgBAAAAABQAAAAAAAAQAAABAAAAQAAADACACQADADAEAAQALAAALgMQADgCACgBQADAAAAAFQAAAFgKAJQgKAIgMAAQgKAAgGgGgAgDgOQgGAIgCAHQAJgBAGgGQAHgGAAgFIgBgDQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAAAAAAAQgGAAgFAHg");
	this.shape_2.setTransform(-13.075,-44.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgVAcQgFgGAAgLQAAgPALgPQAMgPAMAAQAHAAAEAFQAEAEAAAFQAAALgKAJQgKAIgOAEQgBAAAAAAQgBAAAAABQAAAAAAAAQAAABAAAAQAAADACACQADADAEAAQALAAALgMQADgCACgBQADAAAAAFQAAAFgKAJQgKAIgMAAQgKAAgGgGgAgDgOQgGAIgCAHQAJgBAGgGQAHgGAAgFIgBgDQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAAAAAAAQgGAAgFAHg");
	this.shape_3.setTransform(-19.275,-44.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgXAsIACgWIACgSIgBgBQgEgDAAgBQAAgDAEgEQADgBABgCIABgHQADgTAHgIQAFgIALAAQAFAAAFAEQAEAEAAAFQAAAFgDAHQgCAFgEAAIgDgBIgBgDIABgFQAAgKgFAAQgEABgEAMQgDALgBAJIABABIARAAQAFAAAAADQAAAFgGAAQgGACgHAAIgFABIgCAPIgBAKIgBAKIACALQgBABAAAAQAAAAAAABQgBAAAAABQgBAAgBABQgCABgCAAQgJAAABgKg");
	this.shape_4.setTransform(-23.85,-46.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AAPAaQgDgHAAgLQgGALgGAGQgIAGgHAAQgEAAgGgFQgEgFAAgKQAAgHADgNQADgLABgGQACgFAFAAQADAAACACQABAAAAABQABABAAAAQAAABAAAAQAAABAAAAQAAAFgCAHIgEANIgCAKQAAAIADAAQAFAAAIgKQAIgJADgKQADgKACgDQACgDAEAAQAGAAAAAGIgBAEQgEALABAMQAAAPAEADQABABAAAAQAAAAABAAQAAABAAAAQAAAAAAABQAAACgDACIgFABQgFAAgCgGg");
	this.shape_5.setTransform(-35.4,-44.575);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgWAbQgGgHAAgJQAAgOALgPQAKgOAOAAQAJAAAHAHQAGAIAAAKIgBAHIAAABQgEANgLAKQgLAJgKAAQgJAAgFgGgAgBgRQgFAEgDAIQgFAHAAAIQAAAEADAEQABADADAAQAHAAAHgJQAIgIAAgKQAAgGgDgEQgCgEgEAAQgFAAgCADg");
	this.shape_6.setTransform(-42.35,-44.625);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgQAvQgGgDgFgEQgEgEAAgDQAAgBAAgBQAAAAAAgBQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAABQAAAAABAAQAHAKAPAAQAEAAAGgMQAFgMACgQQgRANgKAAQgHAAgDgFQgEgFAAgGQAAgHADgOQAEgNACgDQACgEAGAAQAAAAABAAQAAABABAAQAAAAABABQAAAAABABQABACAAADIgEAKQgFALAAAIIABAGQAAABABAAQAAAAAAABQABAAAAAAQAAAAABAAIAGgBIAJgGQAFgEACgDIACgFIACgPIAAgJQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAgBABAAQAAAAABAAQAAgBABAAQAAAAABAAQAEAAACACQABACAAAGIgBATIgDAbQgDANgEALQgFALgFAEQgGAEgGAAQgIAAgHgDg");
	this.shape_7.setTransform(-49.575,-42.975);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgWAbQgGgHAAgJQAAgOAKgPQALgOANAAQALAAAGAHQAGAIAAAKIgBAHIAAABQgEANgLAKQgLAJgKAAQgIAAgGgGgAgCgRQgEAEgEAIQgDAHAAAIQAAAEACAEQABADADAAQAHAAAHgJQAIgIAAgKQAAgGgCgEQgDgEgEAAQgFAAgDADg");
	this.shape_8.setTransform(-60.95,-44.625);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgfAtQgEgFAAgHQAAgPAMgPQANgOAMgBQAHAAADAEIAFgXIADgNQACgCACgCIAEgBQADgBACADQABADAAADIgCAKIgIAeQgEARAAAKQAAALAFAAIAFgCIADgBQABAAABABQAAAAABAAQAAABAAAAQAAABAAABQAAAEgGAEQgGAEgFAAQgFAAgDgGQgDgHAAgIQgOAWgPgBQgGABgEgGgAgNALQgJALAAAKQAAAGAFAAQAHAAAKgNQAJgMAAgIQAAgBAAAAQgBgBAAAAQAAgBAAAAQgBgBAAAAQgCgBgDAAQgHAAgIALg");
	this.shape_9.setTransform(-68.275,-46.45);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgqANQgGgUAAgOQAAgEACgDQADgEAEAAQADABACACQABAAAAABQAAABABAAQAAABAAAAQAAABAAAAIAAAIIgBAHQAAAHADAIQADALABAAIAGgLIAKgTQAGgMAEgDQAEABACACQACACAAACIAAADIAAACQAAARAKANIABgBIACgIQAEgNAEgJQAFgLADgCQADgCADgBQABAAAAABQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAQAAABAAAAQABABAAAAQAAAAAAABIgBAEQgIAKgGARQgGASgCAFQgCADgCAAQgGAAgDgBQgDgCgEgGIgGgOIgCgLIgJARIgBACQgJAVgGAAQgIAAgHgWg");
	this.shape_10.setTransform(-81.925,-44.7);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgWAbQgGgHAAgJQAAgOALgPQAKgOAOAAQAJAAAHAHQAGAIAAAKIgBAHIAAABQgEANgLAKQgLAJgKAAQgJAAgFgGgAgBgRQgFAEgDAIQgFAHAAAIQAAAEADAEQABADADAAQAHAAAHgJQAIgIAAgKQAAgGgDgEQgCgEgEAAQgFAAgCADg");
	this.shape_11.setTransform(-90.95,-44.625);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgmAtQgDgDAAgEIACgLQAEgPAEgwQAAgBABAAQAAgBAAAAQAAgBABAAQAAAAABgBQAAAAABgBQAAAAABAAQAAAAABgBQABAAAAAAQAIAAAAAKIgCAOIgCAPQAAAAAAABQABAAAAAAQABAAAAAAQABAAABAAIAWgBQAPgCACgCIACgLIABgVQAAgBAAAAQABgBAAAAQAAgBABAAQAAgBABAAQACgDADAAQADAAACACQADACAAAEIgDAPQgCANgCAUIgBAbQAAADgEADQgDADgCAAQgDAAgCgCQgCgCAAgDIABgOIACgPQAAgBAAgBQAAAAgBAAQAAgBAAAAQAAAAAAAAIgLAAIgKABIgMABIgJABQgCADgBAOQAAAJgCAFQgCAGgDAAQgEAAgCgCg");
	this.shape_12.setTransform(-98.975,-45.875);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#000000").ss(2,1,1).p("AiFEYQgZk/Emjw");
	this.shape_13.setTransform(-119.5941,-5.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-134.2,-81.7,183.2,104.7);


(lib.Text2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgXAcQgBgDADgCQACgCADAAIAEABIADABIAMgCQAFgCACgCQAAgDgKgFQgLgGgDgDQgDgEgBgFQAAgKAMgIQAKgIAKAAQALAAgBAJQAAAAAAABQAAAAAAABQAAAAgBABQAAAAgBABIgDACIgDgBIgDgBQgEAAgGAEQgGADAAAFQAAAAAAABQAAABABAAQAAABAAAAQABABAAAAIAIAGQALADADAEQADAEAAAFQAAAIgLAGQgNAGgMAAQgMAAABgIg");
	this.shape.setTransform(3.6,-44.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgfAtQgEgEAAgIQAAgPAMgQQANgOAMABQAHAAADADIAFgXIADgNQACgDACgBIAEgBQADAAACACQABADAAADIgCAKIgIAeQgEARAAAKQAAALAFAAIAFgCIADgBQABAAABABQAAAAABAAQAAABAAAAQAAABAAAAQAAAFgGAEQgGAEgFAAQgFAAgDgGQgDgGAAgJQgOAVgPABQgGAAgEgGgAgNAKQgJANAAAJQAAAGAFgBQAHAAAKgMQAJgMAAgIQAAgBAAAAQgBgBAAAAQAAgBAAAAQgBgBAAAAQgCgBgDAAQgHAAgIAKg");
	this.shape_1.setTransform(-2.725,-46.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgqANQgGgTAAgPQAAgEACgEQADgDAEAAQADABACACQABABAAAAQABABAAAAQAAABAAAAQAAABAAABIAAAHIgBAHQAAAGADAJQADALABAAIAGgLIAKgTQAGgLAEgEQAEAAACADQACABAAADIAAADIAAACQAAARAKANIABgBIACgIQAEgMAEgLQAFgJADgDQADgDADABQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAQAAABAAAAQABABAAAAQAAABAAAAIgBAEQgIAKgGARQgGATgCADQgCAFgCAAQgGAAgDgCQgDgCgEgGIgGgOIgCgLIgJARIgBACQgJAVgGgBQgIABgHgWg");
	this.shape_2.setTransform(-11.575,-44.45);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgWAbQgGgHAAgJQAAgOALgPQAKgOANAAQAKAAAHAHQAGAIAAAKIgBAHIAAABQgEANgLAKQgLAJgKAAQgJAAgFgGgAgCgRQgDAEgFAIQgEAHAAAIQAAAEACAEQACADADAAQAHAAAHgJQAIgIAAgKQAAgGgDgEQgCgEgFAAQgEAAgDADg");
	this.shape_3.setTransform(-20.6,-44.375);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgaAcQgCgEAAgLIAAgLIACgQIAAgEIABgIQABgCACgCQADgCADAAQADAAACACQAAABAAAAQABAAAAABQAAABAAAAQAAABAAAAIgCAMIgCAHIgBAIIABgBQAHgOAHgJQAIgJAIAAQAGAAAEADQADADAAAFQAAADgBACQgBAAAAABQAAAAgBAAQAAABgBAAQAAAAgBAAQgDAAgDgDIgEgCQgEAAgKANQgKANgCARQAAAFgDACQgCACgEAAQgEAAgBgFg");
	this.shape_4.setTransform(-26.325,-44.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgUAdQgFgFAAgJQAAgPAMgQQAMgSAKAAQAHAAADAHQAEAFAAAGQAAAFgCACQAAABgBAAQAAABgBAAQAAAAgBAAQAAAAgBAAQgGABgBgJQgBgFgCAAQgEAAgGAMQgIAMAAALQAAAHAJABQAIgBAKgGQAEgDADgBQAAAAABABQABAAAAAAQABABAAAAQAAABAAABQAAAFgKAGQgLAIgKAAQgKAAgFgGg");
	this.shape_5.setTransform(-33.15,-44.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgYAsIADgWIACgSIgBgBQgEgDAAgBQAAgDAFgDQACgCAAgDIACgGQADgTAGgIQAGgIAKAAQAHAAADAEQAFAEAAAFQAAAGgDAFQgCAGgEAAIgDgBIgBgDIAAgFQAAgKgDAAQgFAAgEAMQgEAMAAAJIACABIAQAAQAFAAAAADQAAAEgGABQgGACgHAAIgFABIgCAPIgBALIAAAJIAAALQAAABAAAAQAAAAAAABQgBAAAAABQgBAAAAABQgCABgEAAQgHAAgBgKg");
	this.shape_6.setTransform(-42.35,-46.15);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgWAbQgGgHAAgJQAAgOALgPQAKgOAOAAQAJAAAHAHQAGAIAAAKIgBAHIAAABQgEANgLAKQgLAJgKAAQgIAAgGgGgAgBgRQgFAEgDAIQgFAHAAAIQAAAEACAEQACADADAAQAHAAAHgJQAIgIAAgKQAAgGgDgEQgCgEgFAAQgEAAgCADg");
	this.shape_7.setTransform(-48.75,-44.375);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgPAnQgEgEgBgJQAAgIAHgWIgGAAIgBAAIgGgCQgCgCAAgDQAAgFAGAAIAMgBIAFgSQACgIAFAAQADAAABACQABABAAAAQABABAAAAQAAABAAABQAAAAAAABIgEASIAUgCIAEABIABAEQAAAFgJABIgUAEIgDAMIgCAQIABAGQAAABABAAQAAAAAAABQABAAAAAAQABAAAAAAIAGgBIAIgFQACgDACAAIAEABIABADQAAAFgJAGQgIAHgIAAQgIAAgEgFg");
	this.shape_8.setTransform(-59.5,-45.475);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgkAWIACgMQACgMAAgSQAAgDACgDQADgDACAAQAEAAACABQACACAAAHQgBAGgDAPQANgdAPAAQANAAACAWQADAUADAAIADAAIAEgBQAAAAABAAQAAABAAAAQABAAAAABQAAABAAAAQAAADgEAEQgDADgHAAQgGAAgDgGQgDgFgBgOQgCgOgEAAQgEAAgJAOQgLAQgDAHIgCAEIgCABQgJAAAAgIg");
	this.shape_9.setTransform(-66.3,-44.325);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgWAbQgGgHAAgJQAAgOALgPQAKgOAOAAQAJAAAHAHQAGAIAAAKIgBAHIAAABQgEANgLAKQgLAJgKAAQgJAAgFgGgAgBgRQgFAEgDAIQgFAHAAAIQAAAEADAEQABADADAAQAHAAAHgJQAIgIAAgKQAAgGgDgEQgCgEgEAAQgFAAgCADg");
	this.shape_10.setTransform(-73.85,-44.375);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgaAcQgCgEAAgLIAAgLIACgQIAAgEIABgIQABgCACgCQADgCADAAQADAAACACQAAABAAAAQABAAAAABQAAABAAAAQAAABAAAAIgCAMIgCAHIgBAIIABgBQAHgOAHgJQAIgJAIAAQAGAAAEADQADADAAAFQAAADgBACQAAAAgBABQAAAAgBAAQAAABgBAAQAAAAgBAAQgDAAgDgDIgEgCQgEAAgKANQgKANgCARQAAAFgDACQgCACgEAAQgEAAgBgFg");
	this.shape_11.setTransform(-79.575,-44.325);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgYAsIADgWIACgSIgBgBQgEgDAAgBQAAgDAFgDQACgCABgDIABgGQADgTAGgIQAHgIAJAAQAGAAAEAEQAFAEAAAFQAAAGgDAFQgCAGgEAAIgDgBIgBgDIAAgFQAAgKgDAAQgFAAgEAMQgEAMAAAJIABABIARAAQAFAAAAADQAAAEgGABQgGACgHAAIgFABIgCAPIgBALIAAAJIABALQgBABAAAAQAAAAAAABQgBAAAAABQgBAAAAABQgDABgDAAQgIAAAAgKg");
	this.shape_12.setTransform(-84.75,-46.15);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgkAWIABgMQADgMAAgSQAAgDADgDQACgDACAAQAEAAACABQACACAAAHQgBAGgDAPQANgdAPAAQANAAACAWQADAUADAAIADAAIAEgBQAAAAABAAQAAABAAAAQABAAAAABQAAABAAAAQAAADgEAEQgDADgGAAQgIAAgCgGQgDgFgCgOQgBgOgEAAQgEAAgJAOQgLAQgDAHIgCAEIgCABQgJAAAAgIg");
	this.shape_13.setTransform(-96.35,-44.325);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgPAlQAAgKACgOIACgGIABgLQAAgEADgDQABgDAEAAQADAAACABQADADgBACIgCAIIAAACQgDALAAAHIgBAMIABAKIAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAgBABQgDACgCAAQgIAAAAgMgAAAghQgCgCAAgDQAAgEACgDQADgDAEAAQAEAAACADQADACAAADQAAAEgDADQgEADgDABQgEgBgCgDg");
	this.shape_14.setTransform(-101.7,-45.95);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgqAOQgGgVAAgOQAAgEACgEQADgCAEAAQADgBACADQABABAAAAQABABAAAAQAAABAAAAQAAABAAABIAAAHIgBAHQAAAGADAJQADALABAAIAGgLIAKgTQAGgMAEgDQAEABACABQACACAAADIAAADIAAABQAAASAKAOIABgBIACgJQAEgNAEgKQAFgJADgDQADgCADAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAABQABAAAAAAQAAABAAAAQABABAAAAQAAABAAAAIgBAEQgIAKgGARQgGATgCADQgCAFgCAAQgGAAgDgDQgDgBgEgGIgGgOIgCgLIgJASIgBABQgJAUgGAAQgIAAgHgUg");
	this.shape_15.setTransform(37.275,-67.6);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgWAbQgGgHAAgJQAAgOAKgPQALgOANAAQALAAAGAHQAGAIAAAKIgBAHIAAABQgEANgLAKQgLAJgKAAQgIAAgGgGgAgCgRQgDAEgFAIQgDAHAAAIQAAAEABAEQACADADAAQAHAAAHgJQAIgIAAgKQAAgGgCgEQgDgEgFAAQgEAAgDADg");
	this.shape_16.setTransform(28.25,-67.525);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgfAwQgDgCAAgDIACgKQAGggAEgiQABgJACgDQADgDACAAQADAAADACQACADAAAEIgCAPIgGAaIgDASQAJgSAHgGQAHgGAHAAQAFAAADADQADAEACANIABALIADAIIADAGIACAEIgCAEIgFACQgFAAgEgGQgEgGgBgKIgCgPQAAgBAAgBQgBAAAAgBQgBAAAAgBQgBAAAAAAQgEAAgJAOQgJANgFAJIgEAIQAAAAgBAAQAAABAAAAQgBAAgBAAQAAAAgBAAQgDAAgCgBg");
	this.shape_17.setTransform(21.175,-69.225);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgYAcQABgDACgCQACgCADAAIADABIAFABIAKgCQAHgCABgCQAAgDgKgFQgLgGgEgDQgCgEAAgFQAAgKALgIQAKgIAKAAQALAAAAAJQAAAAgBABQAAABAAAAQAAAAgBABQAAAAgBABIgDACIgCgBIgEgBQgEAAgHAEQgFADAAAFQAAAAAAABQAAABABAAQAAABAAAAQAAABABAAIAJAGQAJADADAEQAEAEAAAFQAAAIgMAGQgMAGgNAAQgKAAgBgIg");
	this.shape_18.setTransform(14.7,-67.675);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgPAnQgEgEgBgJQAAgIAHgWIgGAAIgBAAIgFgCQgDgCAAgDQAAgFAGAAIAMgBIAFgSQACgIAFAAQADAAABACQABABAAAAQABABAAAAQAAABAAABQAAAAAAABIgEASIAUgCIAEABIABAEQAAAFgJABIgUAEIgDAMIgCAQIABAGQAAABABAAQAAAAAAABQABAAAAAAQABAAAAAAIAGgBIAIgFQACgDACAAIAEABIABADQAAAFgJAGQgIAHgIAAQgIAAgEgFg");
	this.shape_19.setTransform(4.95,-68.625);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgYAcQAAgDADgCQACgCADAAIAEABIADABIALgCQAHgCABgCQAAgDgKgFQgLgGgEgDQgDgEAAgFQAAgKAMgIQALgIAKAAQAKAAAAAJQAAAAgBABQAAABAAAAQAAAAgBABQAAAAAAABIgFACIgCgBIgCgBQgGAAgGAEQgFADAAAFQAAAAAAABQAAABAAAAQABABAAAAQAAABABAAIAJAGQAKADACAEQAEAEAAAFQAAAIgLAGQgMAGgNAAQgMAAAAgIg");
	this.shape_20.setTransform(-0.75,-67.675);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AgaAcQgCgEAAgLIAAgLIACgQIAAgEIABgIQABgCACgCQADgCADAAQADAAACACQAAABAAAAQABAAAAABQAAAAAAABQAAABAAAAIgCAMIgCAHIgBAIIABgBQAHgOAHgJQAIgJAIAAQAGAAAEADQADADAAAFQAAADgBACQAAAAgBABQAAAAgBAAQAAAAgBABQAAAAgBAAQgDAAgDgDIgEgCQgEAAgKANQgKANgCARQAAAFgDACQgCACgEAAQgEAAgBgFg");
	this.shape_21.setTransform(-5.475,-67.475);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgPAmQAAgLACgOIACgGIACgLQAAgEABgEQADgCADAAQADAAACABQADACAAADIgDAJIAAABQgDALAAAHIAAAMIAAAJIAAACQAAAAAAABQAAAAAAABQAAAAgBABQAAAAgBABQgDACgDAAQgHAAAAgLgAAAghQgCgCAAgEQAAgEACgCQACgDAGAAQADAAACADQADACAAADQAAAEgEADQgEADgCAAQgDAAgDgDg");
	this.shape_22.setTransform(-10.4,-69.1);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgYArIADgVIACgSIgBgBQgEgDAAgBQAAgDAFgDQACgCABgDIABgHQADgSAGgIQAHgIAJAAQAGAAAEAEQAFAEAAAFQAAAFgDAGQgCAGgEAAIgDgBIgBgDIAAgFQAAgJgDAAQgFgBgEAMQgEAMAAAJIABABIARgBQAFABAAAEQAAADgGABQgGACgHAAIgFABIgCAPIgBALIAAAKIABAKQgBAAAAABQAAAAAAABQgBAAAAABQgBAAAAAAQgDACgDAAQgIAAAAgLg");
	this.shape_23.setTransform(-14.1,-69.3);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgaAcQgCgEAAgLIAAgLIACgQIAAgEIABgIQABgCACgCQADgCADAAQADAAACACQAAABAAAAQABAAAAABQAAAAAAABQAAABAAAAIgCAMIgCAHIgBAIIABgBQAHgOAHgJQAIgJAIAAQAGAAAEADQADADAAAFQAAADgBACQgBAAAAABQAAAAgBAAQAAAAgBABQAAAAgBAAQgDAAgDgDIgEgCQgEAAgKANQgKANgCARQAAAFgDACQgCACgEAAQgEAAgBgFg");
	this.shape_24.setTransform(-24.275,-67.475);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AAOAaQgCgHAAgLQgGALgGAGQgHAGgIAAQgFAAgEgFQgFgFAAgKQAAgHAEgNQACgLAAgGQADgFAFAAQADAAADACQAAAAAAABQABABAAAAQAAABAAAAQABABAAAAQAAAFgEAHIgDANIgCAKQAAAIADAAQAFAAAIgKQAJgJACgKQADgKACgDQACgDADAAQAHAAAAAGIgBAEQgEALAAAMQABAPAFADQAAAAAAABQAAAAABAAQAAABAAAAQAAAAAAABQAAACgDACIgGABQgEAAgDgGg");
	this.shape_25.setTransform(-31.75,-67.475);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AgWAbQgGgHAAgJQAAgOAKgPQALgOANAAQAKAAAHAHQAGAIAAAKIgBAHIAAABQgEANgLAKQgLAJgKAAQgJAAgFgGgAgCgRQgDAEgFAIQgDAHAAAIQAAAEABAEQACADADAAQAHAAAHgJQAIgIAAgKQAAgGgCgEQgDgEgFAAQgEAAgDADg");
	this.shape_26.setTransform(-38.7,-67.525);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AgQAvQgGgDgFgEQgEgEAAgDQAAgBAAgBQAAAAAAgBQAAAAABgBQAAAAAAgBQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQAHAKAPAAQAEAAAGgMQAFgMACgQQgRANgKAAQgHAAgDgFQgEgFAAgGQAAgHADgOQAEgNACgDQACgEAGAAQAAAAABAAQABABAAAAQABAAAAABQAAAAABABQABACAAADIgEAKQgFALAAAIIABAGQABABAAAAQAAAAAAABQABAAAAAAQAAAAABAAIAGgBIAJgGQAFgEACgDIACgFIACgPIAAgJQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAgBABAAQAAAAABAAQAAgBABAAQABAAAAAAQAEAAACACQABACAAAGIgBATIgDAbQgDANgEALQgFALgFAEQgGAEgGAAQgIAAgHgDg");
	this.shape_27.setTransform(-45.925,-65.875);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgXAcQgBgDADgCQACgCADAAIADABIAFABIALgCQAFgCACgCQAAgDgKgFQgLgGgDgDQgDgEAAgFQgBgKAMgIQAKgIAKAAQAKAAAAAJQAAAAAAABQAAABAAAAQAAAAgBABQAAAAgBABIgDACIgDgBIgDgBQgFAAgFAEQgGADAAAFQAAAAAAABQAAABABAAQAAABAAAAQABABAAAAIAIAGQALADADAEQADAEAAAFQAAAIgMAGQgMAGgNAAQgLAAABgIg");
	this.shape_28.setTransform(-56.6,-67.675);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AgPAmQAAgLADgOIABgGIABgLQAAgEACgEQACgCAEAAQADAAACABQACACABADIgDAJIAAABQgDALAAAHIgBAMIABAJIAAACQAAAAAAABQAAAAAAABQAAAAgBABQAAAAgBABQgDACgDAAQgHAAAAgLgAAAghQgCgCAAgEQAAgEACgCQADgDAEAAQAEAAADADQACACAAADQAAAEgDADQgEADgDAAQgEAAgCgDg");
	this.shape_29.setTransform(-60.15,-69.1);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AgQAvQgGgDgFgEQgEgEAAgDQAAgBAAgBQAAAAAAgBQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAABQAAAAABAAQAHAKAPAAQAEAAAGgMQAFgMACgQQgRANgKAAQgHAAgDgFQgEgFAAgGQAAgHADgOQAEgNACgDQACgEAGAAQAAAAABAAQAAABABAAQAAAAABABQAAAAABABQABACAAADIgEAKQgFALAAAIIABAGQAAABABAAQAAAAAAABQABAAAAAAQAAAAABAAIAGgBIAJgGQAFgEACgDIACgFIACgPIAAgJQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAgBABAAQAAAAABAAQAAgBABAAQAAAAABAAQAEAAACACQABACAAAGIgBATIgDAbQgDANgEALQgFALgFAEQgGAEgGAAQgIAAgHgDg");
	this.shape_30.setTransform(-71.075,-65.875);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AAMAMQgOATgPABQgGAAgDgFQgEgEAAgGQAAgQAOgQQAOgRANAAQAHAAACAGQAHABAAAEIgBAJQgCAMAAAHIABAKIABAFIACABQABABABAAQAAAAAAABQABAAAAABQAAAAAAAAQAAAEgDACQgDABgEAAQgKAAABgVgAgGgHQgKAMAAAJQAAAFACAAQAIAAAIgNQAKgLAAgJQAAgBAAAAQAAgBAAAAQAAgBAAAAQgBgBAAgBQAAAAgBAAQAAAAAAgBQgBAAAAAAQgBAAAAAAQgGAAgIANg");
	this.shape_31.setTransform(-77.8,-67.6);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AgfAtQgEgEAAgIQAAgPAMgQQANgNAMAAQAHAAADADIAFgYIADgMQACgCACgCIAEgCQADAAACADQABADAAADIgCAJIgIAfQgEARAAALQAAAKAFAAIAFgBIADgBQABAAABAAQAAAAAAAAQABABAAAAQAAABAAAAQAAAFgGAEQgGAEgFAAQgFAAgDgGQgDgHAAgIQgOAVgPABQgGgBgEgFgAgNAKQgJAMAAAKQAAAFAFAAQAHAAAKgMQAJgMAAgIQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBgBAAAAQgCgBgDAAQgHAAgIAKg");
	this.shape_32.setTransform(-85.225,-69.35);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AgWAbQgGgHAAgJQAAgOAKgPQALgOAOAAQAKAAAGAHQAGAIAAAKIgBAHIAAABQgEANgLAKQgLAJgKAAQgIAAgGgGgAgBgRQgEAEgFAIQgDAHAAAIQAAAEACAEQABADADAAQAHAAAHgJQAIgIAAgKQAAgGgCgEQgDgEgEAAQgFAAgCADg");
	this.shape_33.setTransform(-92.55,-67.525);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AgIApQgDgCgBgFIAAgLIACgdIADgUIgNAAIgNABQgGAAgDgBQgCgCAAgDQAAgDACgCQADgBAKAAQAQAAAQgCQASgDAJAAQALAAACADQADACAAACQgBAGgFAAIgEAAIgJAAQgPAAgGABIgBADIgCAVIgCAbIABAKIABACQAAADgCADQgBACgDAAIgFgCg");
	this.shape_34.setTransform(-99.35,-68.6);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#000000").ss(2,1,1).p("AiFEYQgZk/Emjw");
	this.shape_35.setTransform(-119.5941,-5.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-134.2,-81.7,183.2,104.7);


(lib.Text1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgVAcQgFgGAAgLQAAgPALgPQAMgPAMAAQAHABAEAEQAEAEAAAGQAAAKgKAJQgKAJgOADQgBAAAAAAQgBABAAAAQAAAAAAAAQAAABAAAAQAAADACACQADADAEAAQALAAALgMQADgDACABQADAAAAADQAAAHgKAIQgKAJgMAAQgKgBgGgGgAgDgOQgGAHgCAIQAJgBAGgGQAHgGAAgFIgBgDQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAAAAAAAQgGgBgFAIg");
	this.shape.setTransform(-16.125,-44.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Ag2AWQAAgSACgLIABgUQAAAAAAgBQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAABAAQAAgBAAAAQABAAABAAQAAAAABAAQAJAAAAAKIgDASIgCALQARgjANAAQAFAAAEAEQACAEAAAPQAAANACAAQABAAAGgNQAHgOAFgFQAFgEAFAAQAHAAADAFQADAGABANIACAPQACAFADACQABABABAAQAAABAAAAQABABAAAAQAAABAAAAQAAADgDACQgDADgEAAQgGAAgDgGQgEgGgBgSIgBgKQAAgBgBAAQAAgBAAAAQAAAAgBgBQAAAAAAAAQgCAAgCAEIgJAQQgFALgEAFQgEAEgDAAQgDAAgEgDQgDgDgBgSQAAgPgCAAQgCAAgKANQgJAPgFALQAAAGgGAAQgIAAAAgLg");
	this.shape_1.setTransform(-25.025,-44.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgPAlQAAgKACgOIACgGIACgLQAAgEABgDQADgDADAAQADAAACABQADADAAACIgDAIIAAACQgDALAAAHIAAAMIAAAKIAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAgBABQgDACgDAAQgHAAAAgMgAAAghQgCgCAAgDQAAgEACgDQACgDAGAAQADAAACADQADACAAADQAAAEgEADQgEADgCABQgDgBgDgDg");
	this.shape_2.setTransform(-32.45,-45.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgPAnQgFgEABgJQAAgIAFgWIgEAAIgCAAIgGgCQgCgCAAgDQAAgFAFAAIANgBIAFgSQACgIAEAAQAEAAACACQAAABAAAAQABABAAAAQAAABAAABQAAAAAAABIgFASIAVgCIAEABIABAEQAAAFgJABIgUAEIgCAMIgDAQIABAGQAAABABAAQAAAAAAABQABAAAAAAQABAAABAAIAFgBIAHgFQAEgDABAAIADABIABADQABAFgJAGQgIAHgIAAQgIAAgEgFg");
	this.shape_3.setTransform(-37.3,-45.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgZAqQgLgHAAgGQAAgEAFAAIAHADQAMAJAKAAQAGAAAGgJQAEgJADgXQgGAGgJAFQgHAEgHAAQgGAAgEgEQgDgDAAgFQAAgKAHgKQAHgLALgJQANgIAJAAQAGAAADADIACABIACADIACAFIgDAHIgDAMIgDAcQgCAVgKAKQgIAJgLAAQgLAAgLgIgAAHggQgHAFgEAJQgHAJAAAGQAAAAABABQAAABAAAAQAAABABAAQAAAAAAAAQAIAAAGgHQAIgGAEgHQAFgIAAgFIgBgDIgCgBQgFAAgHAFg");
	this.shape_4.setTransform(-49.05,-42.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgkAWIABgMQADgMAAgSQAAgDADgDQACgDACAAQAEAAACABQABACAAAHQAAAGgDAPQANgdAPAAQANAAADAWQACAUADAAIADAAIAEgBQAAAAABAAQAAABAAAAQABAAAAABQAAABAAAAQAAADgEAEQgEADgFAAQgIAAgCgGQgDgFgCgOQgBgOgEAAQgEAAgJAOQgLAQgDAHIgCAEIgCABQgJAAAAgIg");
	this.shape_5.setTransform(-55.75,-44.325);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgWAbQgGgHAAgJQAAgOAKgPQALgOAOAAQAKAAAGAHQAGAIAAAKIgBAHIAAABQgEANgLAKQgLAJgKAAQgIAAgGgGgAgBgRQgEAEgFAIQgDAHAAAIQAAAEACAEQABADADAAQAHAAAHgJQAIgIAAgKQAAgGgCgEQgDgEgEAAQgFAAgCADg");
	this.shape_6.setTransform(-63.3,-44.375);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgLAwQgBgEAAgKQAAgUAFgbQAEgcADgFQADgFADAAQAHAAAAAHIgBAHIgFASIgEAWIgBATIABASIAAADQAAAEgDACQgBADgDAAQgEAAgDgEg");
	this.shape_7.setTransform(-67.95,-46.075);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AAMAMQgPATgOAAQgGAAgDgDQgEgFAAgGQAAgPAOgRQAOgRANAAQAHgBACAIQAHAAAAAEIgCAJQgCAMAAAHIABALIACADIADACQAAABABAAQAAAAAAABQABAAAAABQAAAAAAABQAAADgDABQgDACgDAAQgMABACgWgAgGgHQgKAMABAJQAAAFACAAQAGAAAKgNQAJgLABgJQAAgBgBAAQAAgBAAAAQAAgBAAAAQgBgBAAgBQAAAAgBAAQAAAAAAgBQgBAAAAAAQAAAAgBAAQgGAAgIANg");
	this.shape_8.setTransform(-78.4,-44.45);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgaAcQgCgEAAgLIAAgLIACgQIAAgEIABgIQABgCACgCQADgCADAAQADAAACACQAAABAAAAQABAAAAABQAAABAAAAQAAABAAAAIgCAMIgCAHIgBAIIABgBQAHgOAHgJQAIgJAIAAQAGAAAEADQADADAAAFQAAADgBACQAAAAgBABQAAAAgBAAQAAABgBAAQAAAAgBAAQgDAAgDgDIgEgCQgEAAgKANQgKANgCARQAAAFgDACQgCACgEAAQgEAAgBgFg");
	this.shape_9.setTransform(-89.025,-44.325);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgWAbQgGgHAAgJQAAgOAKgPQALgOAOAAQAKAAAGAHQAGAIAAAKIgBAHIAAABQgEANgLAKQgLAJgKAAQgIAAgGgGgAgBgRQgEAEgFAIQgDAHAAAIQAAAEACAEQABADADAAQAHAAAHgJQAIgIAAgKQAAgGgCgEQgDgEgEAAQgFAAgCADg");
	this.shape_10.setTransform(-96.15,-44.375);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgYAsIADgWIACgSIgBgBQgEgDAAgBQAAgDAFgDQACgCABgDIABgGQADgTAGgIQAHgIAJAAQAGAAAEAEQAFAEAAAFQAAAGgDAFQgCAGgEAAIgDgBIgBgDIAAgFQAAgKgDAAQgFAAgEAMQgEAMAAAJIABABIARAAQAFAAAAADQAAAEgGABQgGACgHAAIgFABIgCAPIgBALIAAAJIABALQgBABAAAAQAAAAAAABQgBAAAAABQgBAAAAABQgDABgDAAQgIAAAAgKg");
	this.shape_11.setTransform(-100.95,-46.15);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgZAqQgLgHAAgGQAAgEAEAAIAHADQAOAJAKAAQAGAAAFgJQAFgJADgYQgHAHgJAFQgIAEgGAAQgGAAgEgDQgDgEAAgFQAAgKAHgLQAHgKALgJQAMgIAKAAQAFAAAEADIACABIADADIABAFIgCAHIgEAMIgDAcQgDAVgIAJQgKAKgKAAQgLAAgLgIgAAIggQgHAGgGAIQgFAJAAAFQAAABAAABQAAABAAAAQAAABABAAQAAAAABAAQAHAAAGgHQAIgFAFgIQAEgIAAgFIgBgDIgCgBQgEAAgHAFg");
	this.shape_12.setTransform(26.85,-65.75);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgkAWIABgMQADgMAAgSQAAgDADgDQACgDADAAQADAAABABQACACAAAHQABAGgEAPQANgdAOAAQAOAAADAWQACAUADAAIADAAIADgBQABAAABAAQAAABAAAAQABAAAAABQAAAAAAABQAAADgEAEQgEADgFAAQgHAAgDgGQgDgFgCgOQAAgOgFAAQgEAAgKAOQgKAQgCAHIgCAEIgDABQgJAAAAgIg");
	this.shape_13.setTransform(20.15,-67.475);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgPAmQAAgLACgOIACgGIACgLQAAgEABgEQADgCADAAQADAAACABQADACAAADIgDAJIAAABQgDALAAAHIAAAMIAAAJIAAACQAAAAAAABQAAAAAAABQAAAAgBABQAAAAgBABQgDACgDAAQgHAAAAgLgAAAghQgCgCAAgEQAAgEACgCQACgDAGAAQADAAACADQADACAAADQAAAEgEADQgEADgCAAQgDAAgDgDg");
	this.shape_14.setTransform(14.8,-69.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgUAdQgFgFAAgJQAAgPAMgQQAMgSALAAQAGAAADAHQAEAFAAAGQAAAGgCACQgBAAAAAAQgBABAAAAQgBAAAAAAQAAAAgBAAQgGABAAgJQgCgFgCgBQgEAAgGAOQgIAMAAAJQAAAIAIAAQAJAAAJgGQAFgEACAAQABAAABABQABAAAAAAQABABAAAAQAAABAAABQAAAEgLAIQgKAGgKABQgKgBgFgFg");
	this.shape_15.setTransform(9.45,-67.65);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgPAmQAAgLADgOIABgGIABgLQAAgEACgEQADgCADAAQADAAACABQACACAAADIgCAJIAAABQgDALAAAHIgBAMIABAJIAAACQAAAAAAABQAAAAAAABQAAAAgBABQAAAAgBABQgDACgDAAQgHAAAAgLgAAAghQgCgCAAgEQAAgEACgCQADgDAEAAQAEAAADADQACACAAADQAAAEgDADQgFADgCAAQgDAAgDgDg");
	this.shape_16.setTransform(5.3,-69.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgPAnQgEgEgBgJQAAgIAHgWIgGAAIgBAAIgFgCQgDgCAAgDQAAgFAGAAIAMgBIAFgSQACgIAFAAQADAAABACQABABAAAAQABABAAAAQAAABAAABQAAAAAAABIgEASIAUgCIAEABIABAEQAAAFgJABIgUAEIgDAMIgCAQIABAGQAAABABAAQAAAAAAABQABAAAAAAQABAAAAAAIAFgBIAJgFQACgDACAAIAEABIABADQAAAFgJAGQgIAHgJAAQgHAAgEgFg");
	this.shape_17.setTransform(0.45,-68.625);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgUAdQgFgFAAgJQAAgPAMgQQAMgSALAAQAFAAAEAHQAEAFAAAGQAAAGgCACQAAAAgBAAQgBABAAAAQgBAAAAAAQgBAAAAAAQgFABgBgJQgBgFgCgBQgFAAgHAOQgHAMAAAJQAAAIAIAAQAJAAAJgGQAFgEACAAQABAAABABQABAAAAAAQABABAAAAQAAABAAABQAAAEgLAIQgKAGgKABQgKgBgFgFg");
	this.shape_18.setTransform(-5.65,-67.65);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AAMAMQgPATgOABQgFAAgEgFQgEgEAAgGQAAgQAOgQQAOgRANAAQAHAAACAGQAHABAAAEIgCAJQgCAMAAAHIABAKIACAFIADABQAAABABAAQAAAAAAABQABAAAAABQAAAAAAAAQAAAEgDACQgDABgDAAQgMAAACgVgAgGgHQgJAMAAAJQAAAFACAAQAGAAAKgNQAKgLAAgJQAAgBgBAAQAAgBAAAAQAAgBAAAAQgBgBAAgBQAAAAgBAAQAAAAAAgBQgBAAAAAAQAAAAgBAAQgGAAgIANg");
	this.shape_19.setTransform(-12.15,-67.6);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgaAcQgCgEAAgLIAAgLIACgQIAAgEIABgIQABgCACgCQADgCADAAQADAAACACQAAABAAAAQABAAAAABQAAAAAAABQAAABAAAAIgCAMIgCAHIgBAIIABgBQAHgOAHgJQAIgJAIAAQAGAAAEADQADADAAAFQAAADgBACQgBAAAAABQAAAAgBAAQAAAAgBABQAAAAgBAAQgDAAgDgDIgEgCQgEAAgKANQgKANgCARQAAAFgDACQgCACgEAAQgEAAgBgFg");
	this.shape_20.setTransform(-17.975,-67.475);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AggA0QgDgCAAgDIABgLQAJgjABgkIAAgBIABgKQAAgDACgCQACgCADAAQAHAAAAAJIgCAOIAAAEQAHgLAIgHQAJgHAIgBQAGABAFAEQAEAFAAAHQAAATgOAQQgPAOgOAAQgGAAgDgFIgCAMIgCAXQgBAGgCACQgCACgDAAQgBAAAAAAQgBAAAAgBQgBAAAAAAQgBgBAAAAgAAAgZQgLAOAAAJQAAAAAAABQAAAAAAABQABAAAAAAQABAAAAAAQACACADAAQAGAAAKgLQAKgMAAgLIgBgEQgBgBAAAAQAAgBgBAAQAAAAAAAAQgBAAAAAAQgHAAgLANg");
	this.shape_21.setTransform(-25.85,-65.75);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgkAWIACgMQACgMAAgSQAAgDACgDQADgDADAAQADAAABABQADACAAAHQAAAGgEAPQANgdAOAAQAOAAACAWQADAUADAAIADAAIAEgBQAAAAABAAQAAABAAAAQABAAAAABQAAAAAAABQAAADgEAEQgDADgHAAQgGAAgDgGQgDgFgBgOQgBgOgFAAQgEAAgJAOQgLAQgDAHIgBAEIgDABQgJAAAAgIg");
	this.shape_22.setTransform(-38.05,-67.475);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgVAcQgFgGAAgLQAAgQALgOQAMgPAMAAQAHABAEAEQAEAEAAAGQAAAKgKAJQgKAIgOAEQgBAAAAAAQgBABAAAAQAAAAAAAAQAAABAAAAQAAADACACQADADAEAAQALAAALgMQADgCACAAQADAAAAADQAAAHgKAIQgKAJgMAAQgKAAgGgHgAgDgOQgGAHgCAIQAJgBAGgGQAHgGAAgFIgBgDQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAgBAAAAQgGAAgFAIg");
	this.shape_23.setTransform(-45.275,-67.65);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgVAcQgFgGAAgLQAAgQALgOQAMgPAMAAQAHABAEAEQAEAEAAAGQAAAKgKAJQgKAIgOAEQgBAAAAAAQgBABAAAAQAAAAAAAAQAAABAAAAQAAADACACQADADAEAAQALAAALgMQADgCACAAQADAAAAADQAAAHgKAIQgKAJgMAAQgKAAgGgHgAgDgOQgGAHgCAIQAJgBAGgGQAHgGAAgFIgBgDQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAgBAAAAQgGAAgFAIg");
	this.shape_24.setTransform(-51.475,-67.65);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AgVAyQgEgDgBgEIAAgDIgCgCQgBgCAAgCIABgQIAEgXQAGghACgHQADgGAGAAQAFAAAAAIQAAAHgFARIgFAbQAGgJAIgGQAJgGAGABQAGgBADAFQAEAEABAGQAAASgPAQQgOAQgOAAQgEAAgFgCgAgFANQgMANAAAJQADAFADAAQAGAAAFgFQAHgGAFgJQAEgIAAgHQAAgFgBAAQgJAAgLANg");
	this.shape_25.setTransform(-57.9,-69.6);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AgVAcQgFgGAAgLQAAgQALgOQAMgPAMAAQAHABAEAEQAEAEAAAGQAAAKgKAJQgKAIgOAEQgBAAAAAAQAAABgBAAQAAAAAAAAQAAABAAAAQAAADACACQADADAEAAQALAAALgMQADgCACAAQADAAAAADQAAAHgKAIQgKAJgMAAQgKAAgGgHgAgDgOQgGAHgCAIQAJgBAGgGQAHgGAAgFIgBgDQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAgBAAAAQgGAAgFAIg");
	this.shape_26.setTransform(-69.425,-67.65);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AgTAdQAAgEgEgNQgKgYAAgLQAAgJAIgBQAHABAAAIIAAAIIACAJIAEAJIACAHIABADIACgEIAHgNIANgTIAIgIQACgBADAAQAEAAACABQACADAAACQAAAEgGAEQgEADgIALQgJALgIASQgFAKgFAAQgEAAgEgFg");
	this.shape_27.setTransform(-75.45,-67.45);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgHATQgCgDAAgDIACgNQACgGADgHQACgIAEAAQABAAAAAAQABAAAAABQABAAAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAABQAAABAAAAIgBAFIgBAGIgBADQgCAFAAAGQAAAIgCACQgBACgDAAQgDAAgCgDg");
	this.shape_28.setTransform(-80.4,-70.975);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AAOAaQgCgHAAgLQgGALgGAGQgHAGgIAAQgEAAgFgFQgFgFAAgKQAAgHADgNQAEgLAAgGQACgFAFAAQADAAACACQABAAAAABQABABAAAAQAAABAAAAQAAABAAAAQAAAFgDAHIgDANIgCAKQAAAIADAAQAFAAAIgKQAJgJACgKQADgKACgDQACgDAEAAQAGAAAAAGIgBAEQgDALgBAMQAAAPAGADQAAAAAAABQAAAAABAAQAAABAAAAQAAAAAAABQAAAAAAABQAAAAgBABQAAAAgBABQAAAAgBABIgFABQgFAAgDgGg");
	this.shape_29.setTransform(-85.6,-67.475);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AgWAbQgGgHAAgJQAAgOAKgPQALgOAOAAQAKAAAGAHQAGAIAAAKIgBAHIAAABQgEANgLAKQgLAJgKAAQgIAAgGgGgAgBgRQgEAEgFAIQgDAHAAAIQAAAEACAEQABADADAAQAHAAAHgJQAIgIAAgKQAAgGgCgEQgDgEgEAAQgFAAgCADg");
	this.shape_30.setTransform(-92.55,-67.525);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AgMAlIACgPIACgPIgBgEIgMgOQgIgLgEgCQgGgFgCgDQAAgBgBAAQAAgBAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBAAAAQABgBAAAAQABgBABAAQAAAAABgBQAAAAABAAQAAAAABAAQAJAAATAZIAIAKIAEgFIAFgFQAOgPAEgHQAFgGAGAAQABAAAAAAQABAAAAAAQABABAAAAQABAAAAABQAAAAABABQAAAAAAABQABAAAAABQAAABAAAAQAAAEgWAWIgQARQgBAFgDAbIgBAHIgCACIgFABQgGAAAAgJg");
	this.shape_31.setTransform(-99.5,-68.775);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#000000").ss(2,1,1).p("AiFEYQgZk/Emjw");
	this.shape_32.setTransform(-119.5941,-5.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-134.2,-81.7,183.2,104.7);


(lib.SideviewMotorcycle = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,1,1).p("AgFhXQgEAFgGAEQgVAQgeAAQgdAAgVgQQgVgQAAgXQAAgXAVgQQAVgQAdAAQAeAAAVAQQAUAQAAAXQAAAPgIANQgBABgBABIAKAZIASAsIgDAFIgBAAIijAdIAAAZICQgXIgqBAIgZAlIB3gfIAGASIARA2AgqBSIhTADAAcANIgcAFAAUgNIAIAaIAVBCIADAJAATgNIgTAfAAUgNIgBAAAAUgNIAAAAABeBNIgtACIhbADABeBNIgqALABCAdIAcAwIgkAdIhNA9AAcANIAmAQIBAAcIAPB0AAFg+IAPAxAgDhZIBFB2");
	this.shape.setTransform(162.325,-71.2375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#323232").ss(3,1,1).p("As+jkQgUgbgZgZQh0h1ilAAQikAAh1B1Qh0B0AACkQAAClB0B0QBhBgCBARQAbAEAcAAQAdAAAbgEQCBgRBghgQBfhfASh/QADgTAAgTAOxlRQglAYghAhQh0B0AACkQAAClB0B0QBhBhCBAQQAbAEAdAAQAcAAAbgEQCBgQBhhhQBfhfARh/QAEgcAAgfQAAhrgyhYQgagtgogoQh1h1ikAAQhQAAhFAcQAAAAAAAA");
	this.shape_1.setTransform(89.4,16.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#323232").ss(2,1,1).p("AqKBKIiAAtIiiA4Ii2BAApXA4IBJgXQhJgQgWhQIAAgBQg3gTgphPQijgHhPhHQhVhLidg5Qg/htBOAKQCcBSD9ABQCdBgDCBIIJTBQApthAIAAABQgkBSAHA3ApthAIAAAAApXA4IgzASAhgknIiegEQirAQgBA/AlGgcIkngkApXA4IE+BNIiNBFQDyCRAgCCQDIAdCzgMAoOAhIDIg9IFMgXIrThvAhgknQAagmGjikQDCAABwAzQAhAPAZATQAdAVATAbQjrBFjBBRQhWAkhOAmQhXArhMAuAFcB2IlWipAhgknIGtBRANrnGIAzBgIAzBfIAHBkIBMCOAO1iVIg5g8Ig5ArAMrjoIAYBCIAZBCIBFgFIBEBzIBRCLIA/BuIAAAAAOhhpIAUgsIAjgOAQkgVIBMCOIAyBeIAIAXIAAAAQgBAAAAAAQgeAAgVAUQAAAAgBABIAIANIAvBQQAWAUAMgfIgfhYIgFgPAL5lsIBfgHIAkCiAL5lsIAyCEQjNDCkCCcIANBXQAJCKiLCXAK4C2QgOBWAEBnQi9BYkKAjAK4C2QjJDAkIB4AK4C2QiuA4ihghQmHBOmIhRAiVHdIABAAAiVHdQjIAJizgaIhehwIhVAVIimAoIjFAvQgFABgGACApuFcQBch1BsgdApuFcQBngGFyCHANchkQh0B/gwCb");
	this.shape_2.setTransform(84.2042,-18.0365);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#323232").ss(1,1,1).p("AQCjGQgOAJgNALQgFAFgFAGQhBBAgFBaQAAAHAAAGIAAABQAABaA7BDQAFAFAGAFQBCBCBcAEQAFAAAFAAQBZAABBg6QAHgFAHgHQAmgmARgvQALgeADgjQAAgJAAgJQAAhSgxg+QgEgGgFgFQgGgGgFgGQhChChdgDQgEgBgFAAQgnAAgiALASZBvQAegFAWgUQADgDACgCQAegeACgqQABgDAAgFQAAgjgUgcQgFgIgIgHQgegegsgDQgCAAgDAAQgHAAgGABQgBAAAAAAQgDABgDAAQgZAFgUAOQAAAAAAABQgEACgDADQgEADgDADQgfAdgBArQAAAEAAACQAAAwAfAfQAAAAABABQAfAeAtACQACAAABAAQAHAAAHAAQAEgBAEgBgAvgisQhBg9hZgDQgFgBgFAAQhaAAhDA7QgFAFgGAGQhABAgFBaQAAAHAAAGIAAABQAABaA7BDQAFAFAFAFQBCBCBdAEQAEAAAFAAQBaAABBg6QAHgFAGgHQAngmARgvQAEgLADgLAxiBsQAVgHASgPQADgDACgCQAegeACgqQAAgDAAgFQAAgjgTgcQgFgIgIgHQgegegsgDQgDAAgCAAQgJAAgIACQgCAAgCAAQgdAFgXAUQgDADgDADQgfAdgCArQAAAEAAACQAAAwAfAfQABAAABABQAfAeAtACQABAAACAAQAHAAAGgBQAFAAADgBQACAAABAA");
	this.shape_3.setTransform(89.4,16.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#333333").s().p("ASCBgQgngBgbgbIgBgBQgbgaAAgpIAAgFQACglAagZIAGgFIAFgEIAvBPQAVAUAMgeIgehYIAHAAIAFAAQAmACAaAaQAGAGAFAHQARAYAAAeIgBAHQgCAkgZAZIgFAFQgaAXgmAAIgCAAgAyGBgQgngBgbgbIgBgBQgbgaAAgpIAAgFQACglAagZIAGgFQAagXAkAAIAFAAQAmACAaAaQAGAGAFAHQARAYAAAeIgBAHQgCAkgZAZIgFAFQgaAXgmAAIgCAAg");
	this.shape_4.setTransform(89.275,16.875);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("ARNLSQiBgRhhhhQh0h0AAilQAAikB0h0QAhghAlgXIBRCKQgOAJgMALIgLAKQhBBBgFBaIAAANIAAABQAABaA7BDIALALQBCBCBcADIAJAAQBaAABBg5IANgMQAmgmASgwQALgeADgjIAAgSQAAhSgxg+IgJgLIgMgNQhBhBhdgDIgKgBQgmAAgiALIhMiPQBFgbBPAAQClAAB1B0QAnAoAbAtQAyBXAABsQAAAfgEAdQgSB/heBeQhhBhiBARQgbADgdAAQgcAAgbgDgAy7LSQiBgRhhhhQh0h0AAilQAAikB0h0QB1h0CkAAQClAAB1B0QAYAYAUAbIiiA5QhBg+hZgCIgKgBQhaAAhCA7IgLAKQhBBBgFBaIAAANIAAABQAABaA7BDIALALQBCBCBcADIAJAAQBaAABBg5IANgMQAngnARgvIAHgWICmgoQAAAUgDATQgSB/heBeQhhBhiBARQgbADgdAAQgcAAgbgDgAM3naIgtABIhcADIAqhAIAdgEIAVBBIgVhBIAmAQIAcAwIgcgwIBAAcIAPBzgAKVmwIB4ggIAGASIhNA+QgUgbgdgVgAJJoXICkgeIgVAfIiPAYgAL1oaIgIgbIAAAAIADgFIgSgsIgLgZIACgDIgCADIgKAJQgVAQgeAAQgdAAgVgQQgVgQAAgXQAAgXAVgQQAVgQAdAAQAeAAAVAQQAVAQAAAXQAAAPgJAMIBGB4g");
	this.shape_5.setTransform(89.4,-16);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#CCCCCC").s().p("AB1D+IgwhQIgHgNIABgBQAUgOAYgEIAGgBIABAAIAGAOIAeBYQgHATgLAAQgHAAgIgIgAgBAzIhRiJIhDh0IAUgsIAigPIBMCOIAAAAIBLCOIAyBeIAIAXIgBABQgegBgUAUIgBABg");
	this.shape_6.setTransform(192.175,-8.2636);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#990000").s().p("AGvC6QCgAgCvg4QjJDAkIB5QEIh5DJjAQgOBWAEBoQi9BXkKAkQCLiYgJiJgAnKG4IhehvIhVAUIinAoIjFAvQAWgGASgQIAFgFQAegeACgpIAAgIQAAglgTgbQgFgIgIgIQgegegsgCIgFAAIgSABIC2g/ICig5ICBgtIAzgSIE+BNIiNBFQhsAdhcB2QBngGFyCHQgzACgyAAQiQAAiGgUgABMhHQBMguBXgqQBNgnBXgkQDBhRDrhFIBfgGIgSg3IAlgdIAzBgIAzBgIAHBjIgjAPIg5g9IA5A9IgUAsIhFAFIgZhCIA5gsIgkihIAkChIg5AsIgYhCIgyiFIAyCFQjNDBkCCdg");
	this.shape_7.setTransform(77.2375,-16.075);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#CC0000").s().p("AjtFJICNhFIk+hNIBJgXIDIg+IFMgXIFWCqQECidDNjBIAYBCIAZBBQh0CAgwCbQiuA4ihghIgNhXIANBXQjAAnjAAAQjHAAjIgqgAC/BLIrThuQijgHhPhHQhVhLidg5Qg/htBOAKQCcBTD9AAQCdBgDCBIIJTBQQhXAqhMAugABYioQAagmGkikQDCAABwAzQAhAPAZATQAdAVATAbQjrBFjBBRg");
	this.shape_8.setTransform(65.7292,-30.7429);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFCC00").s().p("AAdF7QgfiDjyiRQGHBSGIhOQAKCJiLCYQg0ADg1AAQiFAAiPgUgAAcF7QlxiHhmAGQBch2BrgdQDyCRAfCDgAm7iiIAAAAQg3gUgphOILTBuIlLAYgAj3k+QAAhACrgQICdAEIGuBRQhWAkhOAng");
	this.shape_9.setTransform(66.3805,-8.1612);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-67.5,-89.5,313.8,147.5);


(lib.RiderHead = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#333333").ss(1,1,1).p("AEBhPQABAAABAAIABAAQAGgBAGAEQAFAEABAIQABAHgFAFQgEAGgHABQgHABgGgFQgFgFgBgGQgBgHAFgGQAEgFAFgBgAmyBxQAdCMGmgaQCFgoBIhuIBIigIgiAEAG5kUQApBng0CPQhNDQhLCDQhKCAjNATQjOAShqhjQhehXgbivIgCgNQgyiDA/huIAAAAQADgLADgHQAUg3AfgsQALgQALgNQB1iNDxgZQDxgaB/B3QAoAmATAugAmniNQAiC3HchmICqgTAlukCQAPEFMYkX");
	this.shape.setTransform(-18.068,2.8377);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E6FFFF").s().p("AlgBEIgCgNQgxiDA/htIAAgBQAiC5HchnICqgTQgGAAgEAFQgEAHAAAGQABAHAGAEQAFAFAHgBQAHgBAFgFQAEgGgBgHQgBgHgFgEQgFgEgHAAIAigEIhHChQhJBtiEAoQhDAFg4AAQkwAAgZh3g");
	this.shape_1.setTransform(-26.339,7.2603);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFCC00").s().p("AmTAlQALgRALgNQB2iMDxgZQDwgZB/B2QApAmASAtQmZCRjKAAQi9AAgHh+g");
	this.shape_2.setTransform(-14.4,-26.7241);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#890011").s().p("AlFEcQhehXgbivQAdCMGmgaQCFgoBIhtIBIihIgiAEQAGgBAGAEQAFAEABAIQABAHgFAFQgEAGgHABQgHABgGgFQgFgFgBgGQgBgHAFgGQAEgFAGgBIABAAIABAAIgBAAIgBAAIirATQncBngii4IAGgSQAUg3AfgsQAPEGMYkYQApBng0CPQhNDQhLCDQhKCAjNATQggADgdAAQiiAAhZhUg");
	this.shape_3.setTransform(-16.879,11.9135);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-65,-44,93.9,93.8);


(lib.RiderBody = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(10,1,1).p("AAZrhIAABcIAAKTAGNixIl0nUAEALiIjnrUAjMLiIDlrUAmMiRIGln0");
	this.shape.setTransform(0.375,0.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-44.3,-78.7,89.4,157.60000000000002);


(lib.FirstviewMotorcycle = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("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");
	this.shape.setTransform(15.15,114.0125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF9999").s().p("AhPJUQgOgiAAgvQAAgwAOghQAOgiAUAAQATAAAOAiQANAhAAAwQAAAvgNAiQgOAhgTAAQgUAAgOghgAhPEYQgZgiABiXQAAiWAUh/QATh+AwiXQAwiWAzgSQAzgThIErQhIErACChQACChgYAUQgJAIgJAAQgPAAgQgWg");
	this.shape_1.setTransform(-90.9883,114.8604);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F4FFFF").s().p("EAtTAEpQkLihgGiCQgFhiEWi/QEdhIEFBIQEUCggCCBQADCjkVCAQiMAXiIAAQiJAAiFgXgEg10AEpQkViAADijQgCiBEUigQEFhIEdBIQEWC/gFBiQgGCCkLChQiFAXiJAAQiJAAiLgXg");
	this.shape_2.setTransform(7.175,-177.4875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#ECFFFF").s().p("AIWDXIwXAAQj9ByiLCdQBFm8GFm6QHti3HFC3QFaGLA+HyQibirjahrg");
	this.shape_3.setTransform(7,-128.1656);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#CCCCCC").s().p("AjzN5QhWhKAAhoQAAguARgpQAVgyAwgpQBXhKB7AAQB7AABWBKQAvAoAVAxQATApAAAwQAABohXBKQhXBJh6ABQh6gBhYhJgAqtrMQhXh7J7h7IEnAAQKhCPioBmQjrCVjZg7QjYg7kCBLQhMAWhEAAQijAAhzh/g");
	this.shape_4.setTransform(8.5905,7.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#999999").s().p("AkUYIQhchOgMhrQgCgQAAgRQAAiABqhbQBrhaCXAAQCWAABqBaQBrBbAACAQAAARgCAQQgMBrhdBOQhqBbiWAAQiXAAhrhbgAjlRQQgwApgVAyQgRAoAAAvQAABoBWBJQBYBKB6AAQB6AABXhKQBXhJAAhoQAAgwgTgpQgVgxgvgoQhWhKh7AAQh7AAhXBKgA6ZAqQiXjwj7hgQjmhJmQCFIjSj6QETipEuACQEuADDpB/QDqB/B3DJQBgCkFdAbIA2ACQCfC6BxBkIiEADIiFACIj7AEIglABQkaAAifj+gARUEmIisgCIhvgCIhvgCQCMhwCUi8IAhgFQD6gqBPiHQB3jKDph+QDqh/EtgDQEugCETCpIAAABIjSD5QmQiFjmBJQj6BgiXDwQigD+kZAAIgmgBgAOJklIJ1rfIQJj7IAAAHQACAoAZArIvoEZIpaLTQgpg5gugzgA45uMIvokZQAZgrACgoIAAgDIAAgEIQJD7IJyLYQgxA3gjA8gEAs3gO1QjWiBg/hvQgZgrgCgoIAAgHQAGhvEqjMQE8hQEjBQQEyCxgCCRQADC1kzCOQibAZiYAAQiYAAiUgZgEAtTgYbQkWC/AFBjQAGCCELChQELAtEXgtQEViAgDijQACiCkUigQiDgkiIAAQiJAAiOAkgEg2VgO1QkziOADi1QgCiREyixQEjhQE8BQQEqDMAGBvIAAAEIAAADQgCAogZArQg/BvjWCBQiUAZiYAAQiXAAicgZgEg10gYbQkUCgACCCQgDCjEVCAQEXAtELgtQELihAGiCQAFhjkWi/QiOgkiJAAQiIAAiDAkgEAoigSlIAAAAgEgoGgT/g");
	this.shape_5.setTransform(7.175,-49.4875);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#333333").s().p("AjeQXQhqhbAAiAQAAgRACgQQAMBqBcBOQBrBbCWAAQCXAABqhbQBdhOAMhqQACAQAAARQAACAhrBbQhqBaiXAAQiWAAhrhagABxihIgfgBIgkAAIggABQjsAHjDBJQhuhfhyhmQhxhkifi5IhHhWQATg0AcgxQAjg8Axg3QCLidD+hyIQWAAQDaBrCbCrQAuAzAoA5QAjAxAeA0Ig2BIQiUC9iMBwQhcBKiKB7Qi8hLjtgHgApprGQCjC0EDhLQEBhLDZA7QDZA7DriVQCohmqhiPIknAAQp7B7BXB7gEg1vgEnQhEgNg1grQgUgQgNgYQgVgqgFg+QgBgSBrg/IBrg/IC+EPIhBAqQgkARggAJQgfAIgcAAQgQAAgPgDgEA0rgEsQgngJgtgWIhHgdIDEkXIBHAoIAjATQBsA/gGANQAABpg2AsQglAeguAQQgPAFgQAEIgHABQgQADgQAAQgUAAgWgEg");
	this.shape_6.setTransform(1.7898,7);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#240000").s().p("AvIgkICEgDICNEvQhSA2hHBFIgaAagAKED0ICtkaIBvADIiCGWQhHhJhTg2gAwGlKIgRhSIBIBVIg3gDgAQYmcIgWBDIggAFIA2hIg");
	this.shape_7.setTransform(8.025,-16.675);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFC788").s().p("EhTCAF7IgDgGQhTiNiqhzQjlickqgwIglgGQhxgQh7AAIgRAAIElizICphnQQqmEC2MPImKFjIgEAEIizCiQgThLgphHgEBPVAFnIgGgEImJljQC3sPQoGEICqBnIEmCzIgRAAQh8AAhyAQIglAGQkpAwjlCcQipBzhUCNIgEAGQgoBHgSBLg");
	this.shape_8.setTransform(2,79.7387);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF9900").s().p("EhChAGOQgBgSgDgRQCvgXAthxQBDimAMhxQASi0CeitQBNhfCagqQAxgJBiBIIhrA/QhrA/ABASQjCElgBD1QgpCNhDAEQkDDChhAGQAbhGgEhQgEA9VAFYQhDgEgoiNQgCj1jGkqQAFgNhrg/IgjgTIhHgoQAngfAggRQAugZAeAGIAAAAQCaAqBNBfQCdCtASC0QALBxBECmQAuByCtAWIgDAjQgFBQAbBGQhggFkDjDg");
	this.shape_9.setTransform(2,-8.9996);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#430011").s().p("EhJvAMyQCWhYA3hvQAghAABhJQAAjGjuiLQjriLlPAAQlNAAjvCLQgjAVgdAVIipBnQA7hsCVhXIAagPIAEgCQDwiBFNAAQFgAAD5CSQD7CSgBDRQAAArgKApQgJAfgPAeQg5B1ifBdQheA4h2AmQBfghBQgwgEBJLAMhQifhdg6h1QgNgagHgbIgHgYQgHghAAgjQAAjRD7iSQD5iSFhAAQE7AAEFCDIAbAPQCUBXA7BsIiqhnQgcgVgkgVQjtiLlOAAQlOAAjtCLQjsCLAADGQAABJAfBAQA3BvCWBYQBRAwBgAhQh3gmheg4gEBOGgI9QkDiImUhUQmShTiRCfQACjrG8BHQG8BGEVCUQCTBNDODpQAQAigBAsQhAijkFiHgEhS7gFdQDOjpCThNQEUiUG9hGQG9hHACDrQiSifmTBTQmTBUkECIQkECHhCCRQAAgaARgig");
	this.shape_10.setTransform(2,21.8365);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#680011").s().p("Eg7oADJQABj0DCklQAEA9AWAqQAMAYAVAQQA1ArBDANQApAIAygNQAggJAkgRQBtAEAkAnQAlAnACAUQACAVgIAcQgHASgJAPIiIBqQgwAbguAXQiBBDhzApQi2BBiTACQBDgEApiOgEA26AD0IghgOQhqguh0hCIiJhqQgJgOgGgTQgKgdACgUQADgUAkgnQAHgHAJgGQApgbBagDQAtAWAnAIQAnAIAigHIAIgBQAQgEAPgFQAtgQAmgeQA2grAAhqQDGEqACD1QAoCOBDAEQi0gDjnhgg");
	this.shape_11.setTransform(2,-8.825);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#890011").s().p("EgRyAgCQlioKgUv+QgUv9FXq+QBmjRCOiSIAagaQBHhFBSg1QBkhDB0grQDChJDtgHIAggBIAkAAIAgABQDsAHC8BLQBZAjBPA0QBTA2BHBJIAPAQQCjCvBcERQD8Lxh9PjQh+PkjnHpQjnHpraATQpOgTlioKgAx0jsQgOAiAAAvQAAAwAOAhQAOAiAUAAQATAAAOgiQAOghAAgwQAAgvgOgiQgOghgTAAQgUAAgOAhgAvS0SQgzASgwCXQgwCWgUB/QgTB+gBCXQAACXAZAjQAZAiAXgUQAYgUgBiiQgCihBIkrQBFkagqAAIgGABgAlky2QhqBbAACAQAAARACAQQgCARAAARQAACABqBaQBrBbCXAAQCXAABphbQBrhaAAiAQAAgRgCgRQACgQAAgRQAAiAhrhbQhphaiXAAQiXAAhrBagEideAQ6MAqQgeOIBxhPQE5jDGsgFIABAAIARAAQB8AABxAQIAlAGQEpAwDlCdQCqBzBTCNIAEAGQAoBHATBLQAQBDA/DmQBADkkdEkQglAmgrAkI1GTQgEBTjAGHQgsgkglgmQkckkA+jkQA/jmARhDQAShLAphHIADgGQBUiNCphzQDlidEqgwIAlgGQBygQB7AAIARAAIAAAAQGtAFE6DDIBvBPMAuZAjGMg04ADpgEBCkgRuIhRisIgDgGIgbg0QgbhGAEhQIAEgjQiugXguhxQhEimgKhyQgTi0iditQCRifGTBTQGTBUEECIQEECHBBCjQiUhBi2gKIgDAAIgFgBQgggBgeAAIAAAAIgBAAQj4AAi9BwQjEB0gcCwQAciwDEh0QC9hwD4AAIABAAIAAAAQAeAAAgABIAFABIADAAQC2AKCUBBII0FvIgbgOQkEiFk8AAQlgAAj6CTQj6CSAADRQAAAjAHAhIAGAYQADAMgDAAQgHAAgvhUgEhHTgR+QAAjRj6iSQj5iTlhAAQlMAAjxCCIIVlwIABASQCUhBC1gKIAFAAQAigCAgAAIAAAAIABAAQD2AAC8BvIADABQDFB1AbCvQgbivjFh1IgDgBQi8hvj2AAIgBAAIAAAAQggAAgiACIgFAAQi1AKiUBBIgBgSQBCiREEiHQEEiIGThUQGThTCRCfQgCjrm8BHQm9BGkUCUQiTBNjPDpQBbjGCLhdQCKhcD0hiQD0hiDrgiQDpghCaAOQCaAOA3AxQA2AxAEAJQAFAKACAAQiaAqhNBfQieCtgRC0QgMByhECmQgtBxiuAXQACARABASQAFBQgbBGIijEmQALgpAAgrgEBLYgjYQkViUm8hGQm8hHgDDrQhNhfiagqQACAAAEgKQAFgJA2gxQA3gxCagOQCagODqAhQDqAiD0BiQD1BiCJBcQCKBdBbDGQjNjpiThNg");
	this.shape_12.setTransform(15.15,181.9165);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("EhJFALJQi2sPwqGEQAdgWAjgUQDviMFNAAQFPAADrCMQDuCKAADGQgBBJggBBQg3BuiWBZQhQAvhfAhQhTAZheAOgEBMgAQBQhgghhRgwQiWhXg3hwQgfhAAAhJQAAjGDsiLQDtiLFOAAQFOAADtCLQAkAWAcAUQwomDi3MPIGJFjQhdgOhSgZgAsIklICFgDQByBmBuBfQhzArhlBCgAIYhhQCKh7BchKIBvACIitEaQhOgzhagkgEAvigFvIl0jsIAAjXIDSj5ICWALIEVDBIBnDOIjEEXIgIALgEgyEgFvIgPgTIi9kPIBljOIEWjBICWgKIDSD5IAADWIl0Dsg");
	this.shape_13.setTransform(2,8.8);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#000000").ss(1,1,1).p("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");
	this.shape_14.setTransform(19.05,114.0125);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FF9999").s().p("AhPJUQgOgiAAgvQAAgwAOghQAOgiAUAAQATAAAOAiQANAhAAAwQAAAvgNAiQgOAhgTAAQgUAAgOghgAhPEYQgZgiABiXQAAiXAUh+QATh+AwiXQAviWA0gSQAzgThIErQhIErACChQACChgYAUQgJAIgJAAQgPAAgQgWg");
	this.shape_15.setTransform(-87.081,114.8711);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#F4FFFF").s().p("EAtTAEpQkLihgGiCQgFhiEWi/QEdhIEFBIQEUCggCCBQADCjkVCAQiMAXiIAAQiJAAiFgXgEg10AEpQkViAADijQgCiBEUigQEFhIEdBIQEWC/gFBiQgGCCkLChQiFAXiJAAQiIAAiMgXg");
	this.shape_16.setTransform(11.075,-177.4875);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#ECFFFF").s().p("AIWDXIwWAAQj/ByiKCdQBGm7GEm7QHsi3HGC3QFaGLA9HyQiZirjbhrg");
	this.shape_17.setTransform(10.9,-128.1625);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#CCCCCC").s().p("AjzN5QhWhKAAhoQAAgvARgoQAVgyAwgpQBXhKB7AAQB7AABWBKQAvAoAWAxQASAqAAAvQAABohXBKQhXBJh6ABQh6gBhYhJgAqtrMQhXh6J7h8IEnAAQKiCPipBmQjrCWjZg8QjYg7kCBLQhMAWhEAAQijAAhzh/g");
	this.shape_18.setTransform(12.4945,7.6);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#999999").s().p("AkUYIQhchOgMhrQgCgQAAgRQAAiABqhbQBrhaCXAAQCWAABqBaQBrBbAACAQAAARgCAQQgMBrhdBOQhqBbiWAAQiXAAhrhbgAjlRQQgwApgVAyQgRAoAAAvQAABoBWBJQBYBKB6AAQB6AABXhKQBXhJAAhoQAAgwgSgpQgWgxgvgoQhWhKh7AAQh7AAhXBKgA6ZAqQiXjwj7hgQjmhJmQCFIjSj6QETipEuACQEuADDpB/QDqB+B3DKQBgCkFdAbIA2ACQCfC6BxBkIiEADIiFACIj7AEIgmABQkZAAifj+gARUEmIisgCIhvgCIhugCQCLhwCUi8IAhgFQD6gqBPiHQB3jKDph+QDqh/EtgDQEugCETCpIAAABIjSD5QmQiFjmBJQj6BgiXDwQigD+kZAAIgmgBgAOJklIJ1rfIQJj7QAGhvEqjMQE8hQEjBQQEyCxgCCRQADC1kzCOQk3AykogyQjWiBg/hvQgZgrgCgoIAAgHIAAAHQACAoAZArIvoEZIpaLTQgpg5gugzgEAtTgYbQkWC/AFBjQAGCCELChQELAtEXgtQEViAgDijQACiCkUigQiCgkiJAAQiJAAiOAkgA45uMIvokZQAZgrACgoIAAgHIQJD7IJyLYQgxA3gjA8gEg2VgO1QkziOADi1QgCiREyixQEjhQE8BQQEqDMAGBvIAAAHQgCAogZArQg/BvjWCBQiUAZiYAAQiXAAicgZgEg10gYbQkUCgACCCQgDCjEVCAQEXAtELgtQELihAGiCQAFhjkWi/QiOgkiJAAQiJAAiCAkgEgoGgT/IAAAAg");
	this.shape_19.setTransform(11.075,-49.4875);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#333333").s().p("AjeQXQhqhbAAiAQAAgRACgQQAMBqBcBOQBrBbCWAAQCXAABqhbQBdhOAMhqQACAQAAARQAACAhrBbQhqBaiXAAQiWAAhrhagABxihIgfgBIgkAAIggABQjsAHjDBJQhuhehyhnQhxhkifi5IhHhWQATg0AcgxQAjg8Axg3QCLidD+hyIQWAAQDbBrCaCrQAuAzApA6QAiAwAeA0Ig2BIQiUC9iLBwQhdBKiKB7Qi7hMjugGgApprGQCkC0EChLQEBhLDZA7QDZA8DriWQCphmqiiPIknAAQp7B8BXB6gEg1vgEnQhEgNg1grQgUgQgNgYQgVgqgFg+QgBgSBrg/IBrg/IC+EPIhBAqQgkARggAJQgfAIgcAAQgQAAgPgDgEA0rgEsQgngJgtgWIhHgdIDEkXIBHAoIAjATQBsA/gGANQAABpg2AsQglAeguAQQgPAFgQAEIgHABQgQADgQAAQgUAAgWgEg");
	this.shape_20.setTransform(5.6898,7);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#240000").s().p("AvIgkICEgCICNEvQhSA1hHBFIgaAagAKED0ICtkZIBvACIiCGWQhHhJhTg2gAwGlKIgRhSIBIBVIg3gDgAQYmcIgVBDIghAFIA2hIg");
	this.shape_21.setTransform(11.925,-16.675);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFC788").s().p("EhTBAF7IgEgGQhUiNiphzQjlickpgwIgmgGQhxgQh8AAIgRAAIEmizICqhnQQomEC3MPImJFjIgGAEIizCiQgShLgohHgEBPUAFnIgEgEImKljQC3sPQoGEICqBnIEmCzIgSAAQh7AAhxAQIglAGQkqAwjlCcQipBzhUCNIgDAGQgpBHgSBLg");
	this.shape_22.setTransform(5.9,79.7387);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FF9900").s().p("EhChAGOQgBgSgCgRQCtgXAuhxQBDimAMhxQASi0CditQBNhfCbgqQAxgJBhBIIhqA/QhrA/ABASQjCElgBD1QgpCNhDAEQkCDChiAGQAchGgFhQgEA9VAFYQhDgEgpiNQgBj1jHkqQAGgNhrg/IgjgTIhHgoQAngfAggRQAugZAdAGIABAAQCZAqBOBfQCdCtASC0QALBxBECmQAuByCuAWIgEAjQgFBQAcBGQhhgFkDjDg");
	this.shape_23.setTransform(5.9,-8.9996);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#430011").s().p("EhJuAMyQCVhYA3hvQAhhAgBhJQAAjGjsiLQjsiLlPAAQlOAAjtCLQgkAVgcAVIiqBnQA8hsCUhXIAagPIADgCQDxiBFNAAQFgAAD6CSQD5CSABDRQAAArgLApQgJAfgOAeQg6B1ieBdQhfA4h3AmQBgghBRgwgEBJKAMhQidhdg7h1QgMgagJgbIgGgYQgGghAAgjQAAjRD5iSQD7iSFfAAQE8AAEECEIAbAOQCUBXA8BsIiqhnQgcgVgkgVQjtiLlOAAQlOAAjtCLQjsCLgBDGQAABJAhBAQA2BvCWBYQBRAwBfAhQh2gmhfg4gEBOGgI9QkDiImThUQmThTiRCfQACjrG8BHQG9BGEUCUQCTBNDODpQARAigBAsQhBijkFiHgEhS7gFdQDOjpCThNQEViUG8hGQG8hHACDrQiRifmTBTQmTBUkDCIQkFCHhCCRQABgaAQgig");
	this.shape_24.setTransform(5.9,21.8365);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#680011").s().p("Eg7oADJQABj0DCklQAEA9AWAqQANAYATAQQA2ArBEANQAoAIAygNQAggJAjgRQBuAEAkAnQAlAnADAUQACAVgJAcQgHASgJAPIiJBqQgvAbguAXQiBBDhzApQi1BBiUACQBDgEApiOgEA26AD0IghgOQhqguh1hCIiIhqQgJgOgHgTQgIgdABgUQADgUAlgnQAGgHAKgGQAogbBagDQAsAWAoAIQAnAIAjgHIAHgBQAQgEAPgFQAugQAlgeQA2grgBhqQDHEqABD1QApCOBDAEQi0gDjnhgg");
	this.shape_25.setTransform(5.9,-8.825);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#890011").s().p("EgRyAgCQlioKgUv+QgUv9FXq+QBljRCPiSIAagaQBHhFBSg1QBkhDB0grQDChJDugHIAfgBIAkAAIAgABQDsAGC7BMQBbAjBOA0QBTA2BHBJIAPAQQCjCvBcERQD8Lxh+PjQh8PkjoHpQjnHprZATQpPgTlioKgAx0jsQgOAiAAAvQAAAwAOAhQAOAiATAAQAUAAAOgiQAOghAAgwQAAgvgOgiQgOghgUAAQgTAAgOAhgAvS0SQgzASgwCXQgxCWgSB/QgUB+AACXQgBCXAZAjQAZAiAYgUQAYgUgDiiQgBihBIkrQBFkagqAAIgGABgAljy2QhrBbAACAQAAARACAQQgCARAAARQAACABrBaQBqBbCXAAQCWAABrhbQBrhaAAiAQAAgRgDgRQADgQAAgRQAAiAhrhbQhrhaiWAAQiXAAhqBagEidfAQ6MAqSgeOIBvhPQE6jDGtgFIAAAAIARAAQB7AAByAQIAlAGQEqAwDlCdQCpBzBUCNIADAGQApBHASBLQAQBDA/DmQA/DkkcEkQgkAmgsAkI1GTQgEBTiAGHQgsgkgkgmQkckkA/jkQA+jmARhDQAShLAphHIADgGQBUiNCqhzQDkidEqgwIAlgGQBxgQB8AAIARAAIAAAAQGtAFE6DDIBvBPMAuYAjGMg03ADpgEBClgRuIhRisIgEgGIgbg0QgbhGAFhQIADgjQiugXgthxQhEimgLhyQgSi0ieitQCRifGTBTQGUBUEDCIQEFCHBACjQiUhBi2gKIgDAAIgFgBQgggBgeAAIAAAAIgBAAQj4AAi9BwQjEB0gcCwQAciwDEh0QC9hwD4AAIABAAIAAAAQAeAAAgABIAFABIADAAQC2AKCUBBII0FvIgbgOQkEiFk8AAQlgAAj6CTQj6CSAADRQAAAjAHAhIAGAYQADAMgDAAQgHAAguhUgEhHTgR+QAAjRj6iSQj6iTlgAAQlMAAjxCCIIVlwIABASQCUhBC2gKIAEAAQAigCAgAAIAAAAIABAAQD2AAC8BvIADABQDEB1AcCvQgcivjEh1IgDgBQi8hvj2AAIgBAAIAAAAQggAAgiACIgEAAQi2AKiUBBIgBgSQBBiREFiHQEDiIGUhUQGThTCRCfQgCjrm9BHQm8BGkVCUQiTBNjNDpQBbjGCKhdQCKhcD1hiQDzhiDrgiQDpghCaAOQCaAOA3AxQA2AxAFAJQAEAKACAAQiaAqhNBfQidCtgTC0QgLByhECmQgtBxiuAXQACARABASQAFBQgbBGIiiEmQAKgpAAgrgEhVPgdigEBLXgjYQkUiUm9hGQm8hHgCDrQhNhfiZgqQABAAAEgKQAFgJA2gxQA3gxCagOQCagODpAhQDrAiDzBiQD2BiCJBcQCLBdBaDGQjNjpiUhNg");
	this.shape_26.setTransform(19.05,181.9165);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("EhJFALJQi3sPwoGEQAcgWAkgUQDtiMFOAAQFPAADsCMQDsCKAADGQABBJghBBQg3BuiVBZQhRAvhgAhQhSAZhdAOgEBMfAQBQhfghhRgwQiWhXg2hwQghhAAAhJQABjGDsiLQDtiLFOAAQFOAADtCLQAkAWAcAUQwomDi3MPIGKFjQhegOhTgZgAsHklICEgDQByBnBuBeQh0ArhkBCgAIYhhQCJh7BdhKIBvACIitEaQhOgzhagkgEAvigFvIl0jsIAAjXIDSj5ICWALIEWDBIBmDOIjFEXIgIALgEgyEgFvIgPgTIi+kPIBnjOIEVjBICWgKIDSD5IAADWIl0Dsg");
	this.shape_27.setTransform(5.9,8.8);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#000000").ss(1,1,1).p("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");
	this.shape_28.setTransform(15.15,108.1625);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#430011").s().p("EhJvAMyQCWhYA3hvQAghAABhJQAAjGjuiLQjriLlPAAQlNAAjvCLQgjAVgdAVIipBnQA7hsCVhXIAagPIAEgCQDwiBFNAAQFgAAD5CSQD7CSgBDRQAAArgKApQgIAfgQAeQg5B1ifBdQheA4h2AmQBfghBQgwgEBJLAMhQifhdg6h1QgNgagHgbIgHgYQgHghAAgjQAAjRD7iSQD5iSFhAAQE7AAEFCEIAbAOQCUBXA7BsIiqhnQgcgVgkgVQjtiLlOAAQlOAAjtCLQjsCLAADGQAABJAfBAQA3BvCWBYQBRAwBgAhQh3gmheg4gEBOGgI9QkDiImUhUQmShTiRCfQACjrG8BHQG8BGEVCUQCTBNDODpQAQAigBAsQhAijkFiHgEhS7gFdQDOjpCThNQEUiUG9hGQG9hHACDrQiSifmTBTQmTBUkECIQkECHhCCRQAAgaARgig");
	this.shape_29.setTransform(2,15.9865);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#ECFFFF").s().p("AIWDXIwXAAQj+ByiKCdQBFm7GFm7QHti3HFC3QFZGLA/HyQiairjbhrg");
	this.shape_30.setTransform(7,-134.0125);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#999999").s().p("AkUYIQhchOgMhrQgCgQAAgRQAAiABqhbQBrhaCXAAQCWAABqBaQBrBbAACAQAAARgCAQQgMBrhdBOQhqBbiWAAQiXAAhrhbgAjlRQQgwApgVAyQgRAoAAAvQAABoBWBJQBYBKB6AAQB6AABXhKQBXhJAAhoQAAgwgSgpQgWgxgvgoQhWhKh7AAQh7AAhXBKgA6ZAqQiXjwj7hgQjmhJmQCFIjSj6QETipEuACQEuADDpB/QDqB+B3DKQBgCkFdAbIA2ACQCfC6BxBkIiEADIiFACIj7AEIgmABQkZAAifj+gARUEmIisgCIhvgCIhugCQCLhwCUi8IAhgFQD6gqBPiHQB3jKDph+QDqh/EtgDQEugCETCpIAAABIjSD5QmQiFjmBJQj6BgiXDwQigD+kZAAIgmgBgAOJklIJ1rfIQJj7IAAAHQACAoAZArIvoEZIpaLTQgpg5gugzgA45uMIvokZQAZgrACgoIAAgHIQJD7IJyLYQgxA3gjA8gEAs3gO1QjWiBg/hvQgZgrgCgoIAAgHQAGhvEqjMQE8hQEjBQQEyCxgCCRQADC1kzCOQibAZiYAAQiYAAiUgZgEAtTgYbQkWC/AFBjQAGCCELChQELAtEXgtQEViAgDijQACiCkUigQiDgkiIAAQiJAAiOAkgEg2VgO1QkziOADi1QgCiREyixQEjhQE8BQQEqDMAGBvIAAAHQgCAogZArQg/BvjWCBQiUAZiYAAQiXAAicgZgEg10gYbQkUCgACCCQgDCjEVCAQEXAtELgtQELihAGiCQAFhjkWi/QiOgkiJAAQiIAAiDAkgEAoigSlIAAAAgEgoGgT/IAAAAg");
	this.shape_31.setTransform(7.175,-55.3375);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#CCCCCC").s().p("AjzN5QhWhKAAhoQAAgvARgoQAVgyAwgpQBXhKB7ABQB7gBBWBKQAvAoAWAxQASAqAAAvQAABohXBKQhXBJh6ABQh6gBhYhJgAqtrMQhXh6J7h8IEnAAQKiCPipBmQjrCWjZg8QjYg7kCBLQhMAWhEAAQijAAhzh/g");
	this.shape_32.setTransform(8.5945,1.75);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("EhJFALJQi2sPwqGEQAdgWAjgUQDviMFNAAQFPAADrCMQDuCKAADGQgBBJggBBQg3BuiWBZQhQAvhfAhQhTAZheAOgEBMgAQBQhgghhRgwQiWhXg3hwQgfhAAAhJQAAjGDsiLQDtiLFOAAQFOAADtCLQAkAWAcAUQwomDi3MPIGJFjQhdgOhSgZgAsIklICFgDQByBnBuBeQhzArhlBCgAIYhhQCJh7BehKIBuACIitEaQhOgzhagkgEAvigFvIl0jsIAAjXIDSj5ICWALIEVDBIBnDOIjEEXIgIALgEgyEgFvIgPgTIi9kPIBljOIEWjBICWgKIDSD5IAADWIl0Dsg");
	this.shape_33.setTransform(2,2.95);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#890011").s().p("EgRyAgCQlioKgUv+QgUv9FXq+QBmjRCOiSIAagaQBHhFBSg1QBkhDB0grQDChJDugHIAfgBIAkAAIAgABQDsAGC8BMQBZAjBPA0QBTA2BHBJIAPAQQCjCvBcERQD8Lxh9PjQh+PkjnHpQjnHpraATQpOgTlioKgAx0jsQgOAiAAAvQAAAwAOAhQAOAiAUAAQATAAAOgiQAOghAAgwQAAgvgOgiQgOghgTAAQgUAAgOAhgAvS0SQgzASgwCXQgxCWgSB/QgUB+gBCXQAACXAZAjQAYAiAYgUQAYgUgBiiQgDihBKkrQBEkagqAAIgGABgAlky2QhqBbAACAQAAARACAQQgCARAAARQAACABqBaQBrBbCXAAQCXAABphbQBrhaAAiAQAAgRgCgRQACgQAAgRQAAiAhrhbQhphaiXAAQiXAAhrBagEideAQ6MAqQgeOIBxhPQE5jDGsgFIABAAIARAAQB8AABxAQIAlAGQEpAwDlCdQCqBzBTCNIAEAGQAoBHATBLQAQBDA/DmQBADkkdEkQglAmgrAkI1GTQgEBTjAGHQgsgkglgmQkckkA+jkQA/jmARhDQAShLAphHIADgGQBUiNCphzQDlidEqgwIAlgGQBygQB7AAIARAAIAAAAQGtAFE6DDIBvBPMAuZAjGMg04ADpgEBCkgRuIhRisIgDgGIgbg0QgbhGAEhQIAEgjQAciwDEh0QC9hwD4AAIABAAIAAAAQAeAAAgABIAFABIADAAQC2AKCUBBII0FvIgbgOQkEiFk8AAQlgAAj6CTQj6CSAADRQAAAjAHAhIAGAYQADAMgDAAQgHAAgvhUgEhHTgR+QAAjRj6iSQj5iTlhAAQlMAAjxCCIIVlwIABASQCUhBC1gKIAFAAQAigCAgAAIAAAAIABAAQD2AAC8BvIADABQDFB1AbCvQgbivjFh1IgDgBQi8hvj2AAIgBAAIAAAAQggAAgiACIgFAAQi1AKiUBBIgBgSQBCiREEiHQEEiIGThUQGThTCRCfQgCjrm8BHQm9BGkUCUQiTBNjPDpQBbjGCLhdQCKhcD0hiQD0hiDrgiQDpghCaAOQCaAOA3AxQA2AxAEAJQAFAKACAAQiaAqhNBfQieCtgRC0QgMByhECmQgtBxiuAXQACARABASQAFBQgbBGIiiEmQAKgpAAgrgEA9GgaVQhEimgKhyQgTi0iditQCRifGTBTQGTBUEECIQEECHBBCjQiUhBi2gKIgDAAIgFgBQgggBgeAAIAAAAIgBAAQj4AAi9BwQjEB0gcCwQiugXguhxgEBLYgjYQkViUm8hGQm8hHgDDrQhNhfiagqQACAAAEgKQAFgJA2gxQA3gxCagOQCagODqAhQDqAiD0BiQD1BiCJBcQCKBdBbDGQjNjpiThNg");
	this.shape_34.setTransform(15.15,176.0665);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#000000").ss(1,1,1).p("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");
	this.shape_35.setTransform(21,108.1625);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFC788").s().p("EhTCAF7IgDgGQhTiNiqhzQjlickqgwIglgGQhxgQh7AAIgRAAIElizICphnQQqmEC2MPImKFjIgEAEIizCiQgThLgphHgEBPVAFnIgGgEImJljQC2sPQpGEICqBnIEmCzIgRAAQh8AAhyAQIglAGQkpAwjlCcQipBzhUCNIgEAGQgoBHgSBLg");
	this.shape_36.setTransform(7.85,73.8887);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#430011").s().p("EhJvAMyQCWhYA3hvQAghAABhJQAAjGjuiLQjriLlPAAQlNAAjvCLQgjAVgdAVIipBnQA7hsCVhXIAagPIAEgCQDxiBFMAAQFgAAD5CSQD6CSAADRQAAArgKApQgIAfgQAeQg5B1ifBdQheA4h2AmQBfghBQgwgEBJLAMhQifhdg5h1QgOgagHgbIgHgYQgHghAAgjQAAjRD7iSQD6iSFgAAQE7AAEFCEIAbAOQCUBXA7BsIiqhnQgcgVgjgVQjuiLlOAAQlOAAjtCLQjsCLAADGQAABJAfBAQA3BvCWBYQBRAwBgAhQh3gmheg4gEBOGgI9QkDiImUhUQmShTiRCfQACjrG8BHQG8BGEVCUQCTBNDODpQAQAigBAsQhAijkFiHgEhS7gFdQDOjpCThNQEUiUG9hGQG9hHACDrQiSifmTBTQmTBUkECIQkECHhCCRQAAgaARgig");
	this.shape_37.setTransform(7.85,15.9865);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#999999").s().p("AkUYIQhchOgMhrQgCgQAAgRQAAiABqhbQBrhaCXAAQCWAABqBaQBrBbAACAQAAARgCAQQgMBrhdBOQhqBbiWAAQiXAAhrhbgAjlRQQgwApgVAyQgRAoAAAvQAABoBWBJQBYBKB6AAQB6AABXhKQBXhJAAhoQAAgwgSgpQgWgxgvgoQhWhKh7AAQh7AAhXBKgA6ZAqQiXjwj7hgQjmhJmQCFIjSj6QETipEuACQEuADDpB/QDqB+B3DKQBgCkFdAbIA2ACQCfC6BxBkIiEADIiFACIj7AEIgmABQkZAAifj+gARUEmIisgCIhvgCIhugCQCLhwCUi8IAhgFQD6gqBPiHQB3jKDph+QDqh/EtgDQEugCETCpIAAABIjSD5QmQiFjmBJQj6BgiXDwQigD+kZAAIgmgBgAOJklIJ1rfIQJj7QAGhvEqjMQE8hQEjBQQEyCxgCCRQADC1kzCOQk3AykogyQjWiBg/hvQgZgrgCgoIAAgHIAAAHQACAoAZArIvoEZIpaLTQgpg5gugzgEAtTgYbQkWC/AFBjQAGCCELChQELAtEXgtQEViAgDijQACiCkUigQiDgkiIAAQiJAAiOAkgA45uMIvokZQAZgrACgoIAAgHIQJD7IJyLYQgxA3gjA8gEg2VgO1QkziOADi1QgCiREyixQEjhQE8BQQEqDMAGBvIAAAHQgCAogZArQg/BvjWCBQiUAZiYAAQiXAAicgZgEg10gYbQkUCgACCCQgDCjEVCAQEXAtELgtQELihAGiCQAFhjkWi/QiOgkiJAAQiIAAiDAkgEgoGgT/IAAAAg");
	this.shape_38.setTransform(13.025,-55.3375);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("EhJFALJQi2sPwqGEQAdgWAjgUQDviMFNAAQFPAADrCMQDuCKAADGQgBBJggBBQg3BuiWBZQhQAvhfAhQhTAZheAOgEBMgAQBQhgghhRgwQiWhXg3hwQgfhAAAhJQAAjGDsiLQDtiLFOAAQFOAADuCLQAjAWAcAUQwomDi3MPIGJFjQhdgOhSgZgAsIklICFgDQByBnBuBeQhzArhlBCgAIYhhQCJh7BehKIBuACIitEaQhOgzhagkgEAvigFvIl0jsIAAjXIDSj5ICWALIEVDBIBnDOIjEEXIgIALgEgyEgFvIgPgTIi9kPIBljOIEWjBICWgKIDSD5IAADWIl0Dsg");
	this.shape_39.setTransform(7.85,2.95);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#890011").s().p("EgRyAgCQlioKgUv+QgUv9FXq+QBmjRCOiSIAagaQBHhFBSg1QBkhDB0grQDChJDugHIAfgBIAkAAIAgABQDsAGC8BMQBZAjBPA0QBTA2BHBJIAPAQQCjCvBcERQD8Lxh9PjQh+PkjnHpQjnHpraATQpOgTlioKgAx0jsQgOAiAAAvQAAAwAOAhQAOAiAUAAQATAAAOgiQAOghAAgwQAAgvgOgiQgOghgTAAQgUAAgOAhgAvS0SQgzASgwCXQgxCWgSB/QgUB+gBCXQAACXAZAjQAYAiAYgUQAYgUgBiiQgDihBKkrQBEkagqAAIgGABgAlky2QhqBbAACAQAAARACAQQgCARAAARQAACABqBaQBrBbCXAAQCXAABphbQBrhaAAiAQAAgRgCgRQACgQAAgRQAAiAhrhbQhphaiXAAQiXAAhrBagEideAQ6MAqQgeOIBxhPQE5jDGsgFIABAAIARAAQB8AABxAQIAlAGQEpAwDlCdQCqBzBTCNIAEAGQAoBHATBLQAQBDA/DmQBADkkdEkQglAmgrAkI1GTQgEBTjAGHQgsgkglgmQkckkA+jkQA/jmARhDQAShLAphHIADgGQBUiNCphzQDlidEqgwIAlgGQBxgQB8AAIARAAIAAAAQGtAFE6DDIBvBPMAuZAjGMg04ADpgEBCkgRuIhRisIgDgGIgbg0QgbhGAEhQIAEgjQAciwDEh0QC9hwD4AAIABAAIAAAAQAeAAAgABIAFABIADAAQC2AKCUBBII0FvIgbgOQkEiFk8AAQlgAAj6CTQj6CSAADRQAAAjAHAhIAGAYQADAMgDAAQgHAAgvhUgEhHTgR+QAAjRj6iSQj5iTlhAAQlMAAjxCCIIVlwIABASQCUhBC1gKIAFAAQAigCAgAAIAAAAIABAAQD2AAC8BvIADABQDFB1AbCvQgbivjFh1IgDgBQi8hvj2AAIgBAAIAAAAQggAAgiACIgFAAQi1AKiUBBIgBgSQBCiREEiHQEEiIGThUQGThTCRCfQgCjrm8BHQm9BGkUCUQiTBNjPDpQBbjGCLhdQCKhcD0hiQD0hiDrgiQDpghCaAOQCaAOA3AxQA2AxAEAJQAFAKACAAQiaAqhNBfQieCtgRC0QgMByhECmQgtBxiuAXQACARABASQAFBQgbBGIiiEmQAKgpAAgrgEA9GgaVQhEimgKhyQgTi0iditQCRifGTBTQGTBUEECIQEECHBBCjQiUhBi2gKIgDAAIgFgBQgggBgeAAIAAAAIgBAAQj4AAi9BwQjEB0gcCwQiugXguhxgEBLYgjYQkViUm8hGQm8hHgDDrQhNhfiagqQACAAAEgKQAFgJA2gxQA3gxCagOQCagODqAhQDqAiDzBiQD2BiCJBcQCKBdBbDGQjNjpiThNg");
	this.shape_40.setTransform(21,176.0665);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("#000000").ss(1,1,1).p("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");
	this.shape_41.setTransform(15.15,114.0125);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#890011").s().p("EgRyAgCQlioKgUv+QgUv9FXq+QBmjRCOiSIAagaQBHhFBSg1QBkhDB0grQDChJDtgHIAggBIAkAAIAgABQDsAHC8BLQBZAjBPA0QBTA2BHBJIAPAQQCjCvBcERQD8Lxh9PjQh+PkjnHpQjnHpraATQpOgTlioKgAx0jsQgOAiAAAvQAAAwAOAhQAOAiAUAAQATAAAOgiQAOghAAgwQAAgvgOgiQgOghgTAAQgUAAgOAhgAvS0SQgzASgwCXQgwCWgUB/QgTB+gBCXQAACXAZAjQAZAiAXgUQAYgUgBiiQgCihBIkrQBFkagqAAIgGABgAlky2QhqBbAACAQAAARACAQQgCARAAARQAACABqBaQBrBbCXAAQCXAABphbQBrhaAAiAQAAgRgCgRQACgQAAgRQAAiAhrhbQhphaiXAAQiXAAhrBagEideAQ6MAqQgeOIBxhPQE5jDGsgFIABAAIARAAQB8AABxAQIAlAGQEpAwDlCdQCqBzBTCNIAEAGQAoBHATBLQAQBDA/DmQBADkkdEkQglAmgrAkI1GTQgEBTjAGHQgsgkglgmQkckkA+jkQA/jmARhDQAShLAphHIADgGQBUiNCphzQDlidEqgwIAlgGQBygQB7AAIARAAIAAAAQGtAFE6DDIBvBPMAuZAjGMg04ADpgEBCkgRuIhRisIgDgGIgbg0QgbhGAEhQIAEgjQAciwDEh0QC9hwD4AAIABAAIAAAAQAeAAAgABIAFABIADAAQC2AKCUBBII0FvIgbgOQkEiFk8AAQlgAAj6CTQj6CSAADRQAAAjAHAhIAGAYQADAMgDAAQgHAAgvhUgEhHTgR+QAAjRj6iSQj5iTlhAAQlMAAjxCCIIVlwIABASQCUhBC1gKIAFAAQAigCAgAAIAAAAIABAAQD2AAC8BvIADABQDFB1AbCvQgbivjFh1IgDgBQi8hvj2AAIgBAAIAAAAQggAAgiACIgFAAQi1AKiUBBIgBgSQBCiREEiHQEEiIGThUQGThTCRCfQgCjrm8BHQm9BGkUCUQiTBNjPDpQBbjGCLhdQCKhcD0hiQD0hiDrgiQDpghCaAOQCaAOA3AxQA2AxAEAJQAFAKACAAQiaAqhNBfQieCtgRC0QgMByhECmQgtBxiuAXQACARABASQAFBQgbBGIijEmQALgpAAgrgEA9GgaVQhEimgKhyQgTi0iditQCRifGTBTQGTBUEECIQEECHBBCjQiUhBi2gKIgDAAIgFgBQgggBgeAAIAAAAIgBAAQj4AAi9BwQjEB0gcCwQiugXguhxgEBLYgjYQkViUm8hGQm8hHgDDrQhNhfiagqQACAAAEgKQAFgJA2gxQA3gxCagOQCagODqAhQDqAiD0BiQD1BiCJBcQCKBdBbDGQjNjpiThNg");
	this.shape_42.setTransform(15.15,181.9165);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("#000000").ss(1,1,1).p("AJV71QjqCVjag7QjYg7kCBLQkCBLiki0QhXh7J7h7IEnAAQKiCPipBmgAonx/QDDhJDtgHQAQgBAQAAQASAAASAAQAQAAAPABQDtAGC8BMQBaAjBOA0QBTA2BHBJQAHAHAIAJQCjCvBcERQD8Lwh9PkQh9PkjnHpQjoHpraATQpOgTlioKQljoKgTv+QgUv+FWq9QBmjRCPiSQAMgNANgNQBIhFBSg1IiNkwIiFACIj7AEQk0ASiqkPQiXjxj7hgQjmhJmQCFAM5+IQAvAzAoA5QAiAxAfA0IgVBDQD5gqBPiHQB3jKDqh+QDph/EugDQEugCETCpIgBABICXAKIEVDCIBmDOQAogfAggRQAugZAdAGIABAAQABAAAFgKQAEgJA2gxQA3gxCagOQCagODqAhQDqAiD0BiQD1BiCJBcQCLBdBbDGQjOjpiThNQkViUm8hGQm8hHgDDrQCRifGTBTQGUBUEDCIQEFCHBACjAOb5vQAQgCARgDAPR63QgbAlgbAjQiUC9iMBwQhdBKiJB7ANZ0+IhvgCIhvgCEAnrgdOQmQiFjmBJQj7BgiXDxQiqEPk0gSIisgCIiCGXAM5+IQg+nzlamLQnEi3nuC3QmEG8hGG7QCLidD+hyIQXAAQDaBrCaCrgEAm4gtiQAAAEAAADQACAoAYArQA/BvDWCBQEpAyE2gyQE0iOgEi1QACiRkyixQkjhQk8BQQkqDMgFBvIwJD7Ip2LfEA44gtcQABiCkTigQkGhIkdBIQkVC/AEBjQAGCCELChQELAtEYgtQEViAgDijgEAwKgWWIgIALIijAAIl0jsIAAjXEAxRgV5QhZAEgpAaQgJAGgHAHQgkAngDAVQgCAUAJAdQAHASAJAQICIBpQB1BCBqAvQAQAHARAHQDnBgC0ACEAq8ghHIjRD5EAnSgsIIvnEZIpbLTEAzOgatIBIAoIAjATQBrA/gGANQAABpg2AsQglAegtAQQgPAFgQADQgEABgEABQgiAGgngIQgogIgtgWEAwKgWWIBHAdEA1igbwQCZAqBNBfQCeCtASC0QALByBECmQAtBxCuAXQgDAXAAAMQgFBQAbBGIAbA0IAEAGIBRCsQBAB1gLgtQAIAbANAaQA6B1CeBdQBfA4B2AmQBVAbBgAPIgFgEImJliQC2sQQpGEQgcgVgkgVQjtiLlOAAQlOAAjtCLQjtCLAADGQAABJAgBAQA3BvCWBYQBRAwBfAhQBTAZBdANEAzOgatIjEEXEBQ5gT7QAQAigBAsQiUhBi1gKQklgSjYCAQjEB0gcCwEBZ8gM+QgNgIgOgGQkEiFk8AAQlgAAj6CTQj6CSAADRQAAAjAHAhQADAMADAMEBhxgHIIgRAAQh7AAhyAQIglAGQkpAwjlCdQiqBzhTCMIgEAGQgoBHgTBLIiziiEBtYgEAQk6jDmsgFIgBAAIklizIiqhnEBdMgJ7Qg8hsiUhXIo0lvEBQEACyQgQBDg/DmQg/DlEcEkQAlAmAsAkIVFTQMA04gDpMguYgjGQghgbgmgZIgpgbEA2egYmQDHEqABD2QApCNBDAEQEDDDBgAFADFlgQAABohXBJQhWBKh7AAQh6AAhYhKQhWhJAAhoQAAgvARgoQAVgyAwgpQBXhKB7AAQB7AABWBKQAwAoAVAxQASApAAAwgAnMkTQgCgQAAgRQAAiABqhbQBrhaCXAAQCXAABqBaQBrBbAACAQAAARgCAQQACARAAARQAACAhrBaQhqBaiXAAQiXAAhrhaQhqhaAAiAQAAgRACgRgAEIkTQgNBrhcBOQhqBaiXAAQiXAAhrhaQhchOgMhrEBvIgCxIhwhPAI9wmICtkaEhU/gT3QgQAiAAAaIABASQCUhBC1gKQElgSDYCAQDEB1AcCvQACARABASQAFBQgbBGIijEmQgIAfgPAeQg6B1ieBdQhfA4h2AmQhVAbhgAPEg9OgZjQiRifmTBTQmUBUkDCIQkFCHhBCREg5ngbsQgCAAgFgKQgEgJg2gxQg3gxiagOQiagOjqAhQjqAij0BiQj1BiiJBcQiLBdhbDGEg9OgZjQgCjrm9BHQm8BGkVCUQiTBNjODpEg7WgtcQgCiCEUigQEFhIEdBIQEWC/gFBjQgGCCkLChQkLAtkXgtQkViAADijgEgpxgsIQg/BvjWCBQkoAyk3gyQkziOADi1QgCiREyixQEjhQE8BQQEqDMAGBvQAAAEAAADQgCAogZArIPoEZIJaLTQAjg8Axg3Eg3UgatIhrA/QhrA/ABASQAFA9AVAqQANAZAUAQQA1AqBEAOQApAIAxgOQAggIAkgSQBtAEAlAnQAkAnADAVQACAUgJAdQgHASgJAQIiIBpQgwAbguAYQiBBChzApQi1BBiUACQBDgEApiNQABj2DCklEg5ngbsQAxgJBiBIIC+EPIAOATICjAAIF0jsIAAjWIjSj6IiWAKIkVDCIhmDOEg9OgZjQieCtgSC0QgLByhECmQgtBxiuAXEg5ngbsQiaAqhNBfEgvDghHQETipEuACQEuADDpB/QDqB+B3DKQBgCkFdAbQAaACAcABQgigoglgtIARBSEg0WgWeIhBApAxe63QATg0AcgxAsH1EIiEADAonx/QhuhfhyhmQhxhkifi6EgpWgtiIQJD7IJyLYEhzOgCtIBwhPQE6jDGsgFIABAAIElizICqhnQAcgVAkgVQDuiLFNAAQFPAADsCLQDtCLAADGQAABJggBAQg3BviWBYQhRAwhfAhQhTAYhdAOIGJliQi2sQwpGEEhzOgCtQAhgbAmgZIApgbEhUKAC2QAQBDA/DmQA/DlkcEkQglAmgsAkI1FTQMgwxgIhMAqRgeOAvnlSQhJErACCgQACCigYAUQgYAUgYgiQgZgjAAiXQABiWATh+QATh/AxiWQAwiXAzgSQA0gShJErgAwjILQAAAwgOAhQgOAigUAAQgTAAgOgiQgOghAAgwQAAgvAOgiQAOghATAAQAUAAAOAhQAOAiAAAvgEhdkgNLQDxiCFMAAQFgAAD6CTQD6CSAADRQAAArgLApEg/YgNxQkCDChhAGEhhSgJ3QA8hsCUhXIAagPIAEgCIIVlwEhl3gHEIARAAQB7AAByAQIAlAGQEpAwDlCdQCqBzBTCMIAEAGQAoBHATBLICziiIAFgEAwQ0/IBfHCAr+wRQBkhDBzgr");
	this.shape_43.setTransform(21,114.0125);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("#000000").ss(1,1,1).p("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");
	this.shape_44.setTransform(15.15,119.8625);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#890011").s().p("EgRyAgCQlioKgUv+QgUv9FXq+QBmjRCOiSIAagaQBHhFBSg1QBkhDB0grQDChJDugHIAfgBIAkAAIAgABQDsAGC8BMQBZAjBPA0QBTA2BHBJIAPAQQCjCvBcERQD8Lxh9PjQh+PkjnHpQjnHpraATQpOgTlioKgAx0jsQgOAiAAAvQAAAwAOAhQAOAiAUAAQATAAAOgiQAOghAAgwQAAgvgOgiQgOghgTAAQgUAAgOAhgAvS0SQgzASgwCXQgxCWgSB/QgUB+gBCXQAACXAZAjQAYAiAYgUQAYgUgBiiQgDihBKkrQBEkagqAAIgGABgAlky2QhqBbAACAQAAARACAQQgCARAAARQAACABqBaQBrBbCXAAQCXAABphbQBrhaAAiAQAAgRgCgRQACgQAAgRQAAiAhrhbQhphaiXAAQiXAAhrBagEideAQ6MAqQgeOIBxhPQE5jDGsgFIABAAIARAAQB8AABxAQIAlAGQEpAwDlCdQCqBzBTCNIAEAGQAoBHATBLQAQBDA/DmQBADkkdEkQglAmgrAkI1GTQgEBTjAGHQgsgkglgmQkckkA+jkQA/jmARhDQAShLAphHIADgGQBUiNCphzQDlidEqgwIAlgGQBygQB7AAIARAAIAAAAQGtAFE6DDIBvBPMAuZAjGMg04ADpgEBCkgRuIhRisIgDgGIgbg0QgbhGAEhQIAEgjQiugXguhxQhEimgKhyQgTi0iditQCRifGTBTQGTBUEECIQEECHBBCjQiUhBi2gKIgDAAIgFgBQgggBgeAAIAAAAIgBAAQj4AAi9BwQjEB0gcCwQAciwDEh0QC9hwD4AAIABAAIAAAAQAeAAAgABIAFABIADAAQC2AKCUBBII0FvIgbgOQkEiFk8AAQlgAAj6CTQj6CSAADRQAAAjAHAhIAGAYQADAMgDAAQgHAAgvhUgEhHTgR+QAAjRj6iSQj5iTlhAAQlMAAjxCCIIVlwIABASQCUhBC1gKIAFAAQAigCAgAAIAAAAIABAAQD4AAC9BwQDFB1AbCvQgbivjFh1Qi9hwj4AAIgBAAIAAAAQggAAgiACIgFAAQi1AKiUBBIgBgSQBCiREEiHQEEiIGThUQGThTCRCfQgCjrm8BHQm9BGkUCUQiTBNjPDpQBbjGCLhdQCKhcD0hiQD0hiDrgiQDpghCaAOQCaAOA3AxQA2AxAEAJQAFAKACAAQiaAqhNBfQieCtgRC0QgMByhECmQgtBxiuAXQACARABASQAFBQgbBGIiiEmQAKgpAAgrgEBLYgjYQkViUm8hGQm8hHgDDrQhNhfiagqQACAAAEgKQAFgJA2gxQA3gxCagOQCagODqAhQDqAiD0BiQD1BiCJBcQCKBdBbDGQjNjpiThNg");
	this.shape_45.setTransform(15.15,187.7665);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f().s("#000000").ss(1,1,1).p("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");
	this.shape_46.setTransform(21,119.8625);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#890011").s().p("EgRyAgCQlioKgUv+QgUv9FXq+QBmjRCOiSIAagaQBHhFBSg1QBkhDB0grQDChJDugHIAfgBIAkAAIAgABQDsAGC8BMQBZAjBPA0QBTA2BHBJIAPAQQCjCvBcERQD8Lxh9PjQh+PkjnHpQjnHpraATQpOgTlioKgAx0jsQgOAiAAAvQAAAwAOAhQAOAiAUAAQATAAAOgiQAOghAAgwQAAgvgOgiQgOghgTAAQgUAAgOAhgAvS0SQgzASgwCXQgxCWgSB/QgUB+gBCXQAACXAZAjQAYAiAYgUQAYgUgBiiQgDihBKkrQBEkagqAAIgGABgAlky2QhqBbAACAQAAARACAQQgCARAAARQAACABqBaQBrBbCXAAQCXAABphbQBrhaAAiAQAAgRgCgRQACgQAAgRQAAiAhrhbQhphaiXAAQiXAAhrBagEideAQ6MAqQgeOIBxhPQE5jDGsgFIABAAIARAAQB8AABxAQIAlAGQEpAwDlCdQCqBzBTCNIAEAGQAoBHATBLQAQBDA/DmQBADkkdEkQglAmgrAkI1GTQgEBTjAGHQgsgkglgmQkckkA+jkQA/jmARhDQAShLAphHIADgGQBUiNCphzQDlidEqgwIAlgGQBxgQB8AAIARAAIAAAAQGtAFE6DDIBvBPMAuZAjGMg04ADpgEBCkgRuIhRisIgDgGIgbg0QgbhGAEhQIAEgjQAciwDEh0QC9hwD4AAIABAAIAAAAQAeAAAgABIAFABIADAAQC2AKCUBBII0FvIgbgOQkEiFk8AAQlgAAj6CTQj6CSAADRQAAAjAHAhIAGAYQADAMgDAAQgHAAgvhUgEhHTgR+QAAjRj6iSQj5iTlhAAQlMAAjxCCIIVlwIABASQCUhBC1gKIAFAAQAigCAgAAIAAAAIABAAQD4AAC9BwQDFB1AbCvQgbivjFh1Qi9hwj4AAIgBAAIAAAAQggAAgiACIgFAAQi1AKiUBBIgBgSQBCiREEiHQEEiIGThUQGThTCRCfQgCjrm8BHQm9BGkUCUQiTBNjPDpQBbjGCLhdQCKhcD0hiQD0hiDrgiQDpghCaAOQCaAOA3AxQA2AxAEAJQAFAKACAAQiaAqhNBfQieCtgRC0QgMByhECmQgtBxiuAXQACARABASQAFBQgbBGIiiEmQAKgpAAgrgEA9GgaVQhEimgKhyQgTi0iditQCRifGTBTQGTBUEECIQEECHBBCjQiUhBi2gKIgDAAIgFgBQgggBgeAAIAAAAIgBAAQj4AAi9BwQjEB0gcCwQiugXguhxgEBLYgjYQkViUm8hGQm8hHgDDrQhNhfiagqQACAAAEgKQAFgJA2gxQA3gxCagOQCagODqAhQDqAiDzBiQD2BiCJBcQCKBdBbDGQjNjpiThNg");
	this.shape_47.setTransform(21,187.7665);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11,p:{y:-8.825,x:2}},{t:this.shape_10},{t:this.shape_9,p:{y:-8.9996,x:2}},{t:this.shape_8,p:{y:79.7387}},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2,p:{y:-177.4875,x:7.175}},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21,p:{x:11.925,y:-16.675}},{t:this.shape_20,p:{x:5.6898,y:7}},{t:this.shape_19},{t:this.shape_18,p:{x:12.4945,y:7.6}},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15,p:{x:-87.081,y:114.8711}},{t:this.shape_14}]},2).to({state:[{t:this.shape_20,p:{x:1.7898,y:1.15}},{t:this.shape_34},{t:this.shape_33,p:{y:2.95}},{t:this.shape_32,p:{x:8.5945}},{t:this.shape_21,p:{x:8.025,y:-22.525}},{t:this.shape_31,p:{y:-55.3375}},{t:this.shape_30,p:{x:7,y:-134.0125}},{t:this.shape_2,p:{y:-183.3375,x:7.175}},{t:this.shape_11,p:{y:-14.675,x:2}},{t:this.shape_9,p:{y:-14.8496,x:2}},{t:this.shape_29,p:{y:15.9865}},{t:this.shape_8,p:{y:73.8887}},{t:this.shape_15,p:{x:-90.981,y:109.0211}},{t:this.shape_28}]},2).to({state:[{t:this.shape_20,p:{x:7.6398,y:1.15}},{t:this.shape_40,p:{y:176.0665}},{t:this.shape_39,p:{y:2.95}},{t:this.shape_32,p:{x:14.4445}},{t:this.shape_38,p:{y:-55.3375}},{t:this.shape_21,p:{x:13.875,y:-22.525}},{t:this.shape_30,p:{x:12.85,y:-134.0125}},{t:this.shape_2,p:{y:-183.3375,x:13.025}},{t:this.shape_11,p:{y:-14.675,x:7.85}},{t:this.shape_9,p:{y:-14.8496,x:7.85}},{t:this.shape_37,p:{y:15.9865}},{t:this.shape_36,p:{y:73.8887}},{t:this.shape_15,p:{x:-85.131,y:109.0211}},{t:this.shape_35}]},2).to({state:[{t:this.shape_6},{t:this.shape_42},{t:this.shape_13},{t:this.shape_4},{t:this.shape_5},{t:this.shape_7},{t:this.shape_3},{t:this.shape_2,p:{y:-177.4875,x:7.175}},{t:this.shape_11,p:{y:-8.825,x:2}},{t:this.shape_9,p:{y:-8.9996,x:2}},{t:this.shape_10},{t:this.shape_8,p:{y:79.7387}},{t:this.shape_1},{t:this.shape_41}]},2).to({state:[{t:this.shape_20,p:{x:7.6398,y:7}},{t:this.shape_40,p:{y:181.9165}},{t:this.shape_39,p:{y:8.8}},{t:this.shape_18,p:{x:14.4445,y:7.6}},{t:this.shape_38,p:{y:-49.4875}},{t:this.shape_21,p:{x:13.875,y:-16.675}},{t:this.shape_30,p:{x:12.85,y:-128.1625}},{t:this.shape_2,p:{y:-177.4875,x:13.025}},{t:this.shape_11,p:{y:-8.825,x:7.85}},{t:this.shape_9,p:{y:-8.9996,x:7.85}},{t:this.shape_37,p:{y:21.8365}},{t:this.shape_36,p:{y:79.7387}},{t:this.shape_15,p:{x:-85.131,y:114.8711}},{t:this.shape_43}]},2).to({state:[{t:this.shape_20,p:{x:1.7898,y:12.85}},{t:this.shape_45},{t:this.shape_33,p:{y:14.65}},{t:this.shape_18,p:{x:8.5945,y:13.45}},{t:this.shape_31,p:{y:-43.6375}},{t:this.shape_21,p:{x:8.025,y:-10.825}},{t:this.shape_30,p:{x:7,y:-122.3125}},{t:this.shape_2,p:{y:-171.6375,x:7.175}},{t:this.shape_11,p:{y:-2.975,x:2}},{t:this.shape_9,p:{y:-3.1496,x:2}},{t:this.shape_29,p:{y:27.6865}},{t:this.shape_8,p:{y:85.5887}},{t:this.shape_15,p:{x:-90.981,y:120.7211}},{t:this.shape_44}]},2).to({state:[{t:this.shape_20,p:{x:7.6398,y:12.85}},{t:this.shape_47},{t:this.shape_18,p:{x:14.4445,y:13.45}},{t:this.shape_38,p:{y:-43.6375}},{t:this.shape_21,p:{x:13.875,y:-10.825}},{t:this.shape_30,p:{x:12.85,y:-122.3125}},{t:this.shape_39,p:{y:14.65}},{t:this.shape_2,p:{y:-171.6375,x:13.025}},{t:this.shape_11,p:{y:-2.975,x:7.85}},{t:this.shape_9,p:{y:-3.1496,x:7.85}},{t:this.shape_37,p:{y:27.6865}},{t:this.shape_36,p:{y:85.5887}},{t:this.shape_15,p:{x:-85.131,y:120.7211}},{t:this.shape_46}]},2).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-993.8,-219.8,2023.8,667.7);


(lib.CoachHead = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#333333").ss(1,1,1).p("AApiOQACgGABgHQAEAHAFAFQgGAAgGABQgMBpj4BCQDAAgCeANQGvAlC8hmQBOg7hOg8Qk4g/mBAeAAsibQApjBhBh7Qlui2mTC2QhND+BJDYACDBKQABAUAAATQAAC7iECDQh6B8irAIQgMAAgMAAQi6AAiEiEQiEiDAAi7QAAg8AOg2AjbAdQkLAjkHg3QgCgGgCgE");
	this.shape.setTransform(32.5052,-51.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#890011").s().p("ACDE6QiegOjAggQD4hDAMhpQgMBpj4BDQkLAjkHg3IgEgLQhJjYBNj8QGTi3FuC3QBBB6gpDBIgDAMIAMgBQGBgeE4A/QBOA8hOA8QiLBMkOAAQhhAAhxgKg");
	this.shape_1.setTransform(32.5052,-75.3458);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFC788").s().p("Ak+DjQiDiDAAi6QAAg8AOg3IAEALQEGA3ELgjQDAAgCfAOQABATAAATQAAC6iECDQh7B8irAIIgYAAQi5AAiFiEgAFqlmIAIALIgLABIADgMg");
	this.shape_2.setTransform(0.75,-31.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CoachHead, new cjs.Rectangle(-47.4,-108.7,159.8,114.60000000000001), null);


(lib.CoachBody = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(10,1,1).p("AAZrhIAABcIAAKTAGNixIl0nUAEALiIjnrUAmMiRIGln0AjMLiIDlrU");
	this.shape.setTransform(0.375,0.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CoachBody, new cjs.Rectangle(-44.3,-78.7,89.4,157.60000000000002), null);


(lib.START = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("ARqAAQAAHUlLFLQlLFLnUAAQnTAAlLlLQlLlLAAnUQAAnTFLlLQFLlLHTAAQHUAAFLFLQFLFLAAHTgAOlgQI2RM2IAA5ug");
	this.shape.setTransform(-14,-10.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFCC00").s().p("ArIs2IWRM2I2RM3g");
	this.shape_1.setTransform(8,-12.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#990000").s().p("AseMfQlLlLAAnUQAAnTFLlLQFLlLHTAAQHUAAFLFLQFLFLAAHTQAAHUlLFLQlLFLnUAAQnTAAlLlLgAnsMmIWRs2I2Rs4g");
	this.shape_2.setTransform(-14,-10.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(3,1,1).p("ARqAAQAAHUlLFLQlLFLnUAAQnTAAlLlLQlLlLAAnUQAAnTFLlLQFLlLHTAAQHUAAFLFLQFLFLAAHTg");
	this.shape_3.setTransform(-14,-10.95);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(1,1,1).p("ALJAAI2RM3IAA5tg");
	this.shape_4.setTransform(8,-12.675);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#990000").s().p("AseMfQlLlLAAnUQAAnTFLlLQFLlLHTAAQHUAAFLFLQFLFLAAHTQAAHUlLFLQlLFLnUAAQnTAAlLlLgAnsMmIWRs3I2Rs2g");
	this.shape_5.setTransform(-14,-6.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1,p:{y:-12.675}},{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape_1,p:{y:-12.675}},{t:this.shape_4,p:{y:-12.675}},{t:this.shape_3,p:{y:-10.95}}]},1).to({state:[{t:this.shape_5},{t:this.shape_1,p:{y:-8.675}},{t:this.shape_3,p:{y:-6.95}},{t:this.shape_4,p:{y:-8.675}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-128.5,-125.4,229,233);


(lib.RIGHT = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AF8AAImZHgIleAAIGZngImZnfIFeAAg");
	this.shape.setTransform(-101,-55.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFCC00").s().p("Al7HgIGZngImZnfIFeAAIGZHfImZHgg");
	this.shape_1.setTransform(-101,-55.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(3,1,1).p("AF8AAImZHgIleAAIGZngImZnfIFeAAg");
	this.shape_2.setTransform(-101,-55.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CC0000").s().p("Al7HgIGZngImZnfIFeAAIGZHfImZHgg");
	this.shape_3.setTransform(-101,-55.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_1},{t:this.shape_2}]},1).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-140.5,-105.4,79,99);


(lib.REPLAY = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFCC00").s().p("AhRCUIAQhsIhUi7IBkAAIAgBeIADALIAAALIAAAEIADgOIADgKIAzhgIBrAAIh6C7IgQBsg");
	this.shape.setTransform(110.275,6.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFCC00").s().p("AA8CUIgEgkIhdAAIgPAkIhgAAICQknIBeAAIA7EngAgOA1IA8AAIgQhtg");
	this.shape_1.setTransform(79.95,6.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFCC00").s().p("Ah3CUIAtknIBeAAIghDaICFAAIgLBNg");
	this.shape_2.setTransform(55.975,6.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC00").s().p("AiPCUIAtknIB4AAQA+AAAeAXQAeAXAAAuQAAA3ggAZQghAbhAAAIgzAAIgOBggAgbgQIAgAAQAbAAALgIQALgHAAgSQAAgPgKgGQgJgHgVAAIgfAAg");
	this.shape_3.setTransform(29.825,6.3);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFCC00").s().p("AiICUIAtknIDjAAIgKBHIiHAAIgHAoIB4AAIgKBBIh4AAIgGAvICQAAIgLBIg");
	this.shape_4.setTransform(2.4,6.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFCC00").s().p("AAeCUIgBgHIgBgHIABgGIAAgKIAFgeIAAgFIAAgHQAAgUgKgHQgLgHgagBIgYAAIgQBrIhbAAIAsknICHAAQA5AAAbAUQAaATAAApQAAAegOAVQgOAUgcALQAUAIAIAMQAIAMAAAUIAAAJIgBAJIgDAeIgBAGIAAAEQAAAGACADQADAEAEACIAAAIgAgcgVIAsAAQAVABAKgIQAKgHAAgPQAAgOgJgGQgJgGgUAAIgnAAg");
	this.shape_5.setTransform(-26.125,6.3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#FF9900").ss(5,1,1).p("AyllsMAlLAAAIAALZMglLAAAg");
	this.shape_6.setTransform(45,6.55);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#CC0000").s().p("AylFtIAArZMAlLAAAIAALZg");
	this.shape_7.setTransform(45,6.55);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#FF9900").ss(10,1,1).p("AyllsMAlLAAAIAALZMglLAAAg");
	this.shape_8.setTransform(45,6.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF9900").s().p("AhRCUIAQhsIhUi7IBkAAIAgBeIADALIAAALIAAAEIADgOIADgKIAzhgIBrAAIh6C7IgQBsg");
	this.shape_9.setTransform(110.275,6.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FF9900").s().p("AA8CUIgEgkIhdAAIgPAkIhgAAICQknIBeAAIA7EngAgOA1IA8AAIgQhtg");
	this.shape_10.setTransform(79.95,6.3);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FF9900").s().p("Ah3CUIAtknIBeAAIghDaICFAAIgLBNg");
	this.shape_11.setTransform(55.975,6.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FF9900").s().p("AiPCUIAtknIB4AAQA+AAAeAXQAeAXAAAuQAAA3ggAZQghAbhAAAIgzAAIgOBggAgbgQIAgAAQAbAAALgIQALgHAAgSQAAgPgKgGQgJgHgVAAIgfAAg");
	this.shape_12.setTransform(29.825,6.3);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FF9900").s().p("AiICUIAtknIDjAAIgKBHIiHAAIgHAoIB4AAIgKBBIh4AAIgGAvICQAAIgLBIg");
	this.shape_13.setTransform(2.4,6.3);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FF9900").s().p("AAeCUIgBgHIgBgHIABgGIAAgKIAFgeIAAgFIAAgHQAAgUgKgHQgLgHgagBIgYAAIgQBrIhbAAIAsknICHAAQA5AAAbAUQAaATAAApQAAAegOAVQgOAUgcALQAUAIAIAMQAIAMAAAUIAAAJIgBAJIgDAeIgBAGIAAAEQAAAGACADQADAEAEACIAAAIgAgcgVIAsAAQAVABAKgIQAKgHAAgPQAAgOgJgGQgJgGgUAAIgnAAg");
	this.shape_14.setTransform(-26.125,6.3);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#990000").s().p("AylFtIAArZMAlLAAAIAALZg");
	this.shape_15.setTransform(45,6.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_7},{t:this.shape_8},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_15},{t:this.shape_8},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-79,-34.9,248,83);


(lib.LEFT = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("Al7AAIGZHgIFeAAImZngIGZnfIleAAg");
	this.shape.setTransform(-101,-55.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFCC00").s().p("AAeHgImZngIGZnfIFeAAImZHfIGZHgg");
	this.shape_1.setTransform(-101,-55.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(3,1,1).p("Al7AAIGZHgIFeAAImZngIGZnfIleAAg");
	this.shape_2.setTransform(-101,-55.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CC0000").s().p("AAeHgImZngIGZnfIFeAAImZHfIGZHgg");
	this.shape_3.setTransform(-101,-55.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_1},{t:this.shape_2}]},1).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-140.5,-105.4,79,99);


(lib.GO = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFCC00").s().p("AhACUIAMhSIBVAAIgMBSgAgeAhIAIi0IBXAAIgwC0g");
	this.shape.setTransform(140.875,6.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFCC00").s().p("AhyB3QgmgmAAhAQAAgjALgfQALgfAVgYQAXgZAfgMQAegNAkgBQBCABAmAkQAmAlAABBQAAAjgKAfQgLAfgVAWQgXAagfANQgfAOgkAAQhCgBgmgkgAgog2QgTAdAAAsQAAAeANARQANAQAZAAQAeAAATgeQATgdAAgvQAAgbgOgQQgNgPgYAAQgeAAgTAcg");
	this.shape_1.setTransform(116.925,6.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFCC00").s().p("AhxB1QgjglAAg+QAAgkAKgeQALggAUgWQAXgbAegNQAdgMAlAAQA9AAAjAcQAjAcAGA1IhXAAQgEgSgMgJQgNgKgUAAQgeAAgSAcQgUAdABAtQAAAfAMAPQAOARAZgBQAQAAAOgIQANgJAJgPIgpAAIAKg8ICAAAIgYCdIg8AAIgCgWQgPAPgVAIQgUAHgYAAQg6AAgjgmg");
	this.shape_2.setTransform(84.9,6.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC00").s().p("AhjCAQgjgbAAgwIBbAAIAAABQAAAQAMAJQALAJAUAAQAQAAAIgGQAIgGAAgMQAAgOgkgQIgOgGQg0gXgSgTQgTgVAAgeQAAgqAggYQAfgXA2AAQA4AAAhAZQAhAZADAtIhYAAQgCgPgJgHQgKgHgRAAQgLAAgHAFQgIAGAAAJQAAANAsASIAcAMQAjAQARAUQARAVAAAcQAAAtghAZQghAZg8AAQg+AAgjgbg");
	this.shape_3.setTransform(41.875,6.325);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFCC00").s().p("AgZA5IAAhxIAzAAIAABxg");
	this.shape_4.setTransform(25.05,-2.15);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFCC00").s().p("AhTCUIAhjcIhUAAIAMhLIEBAAIgNBLIhQAAIggDcg");
	this.shape_5.setTransform(10.725,6.3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFCC00").s().p("AiHCUIAtknIDiAAIgKBHIiHAAIgHAoIB4AAIgLBBIh3AAIgGAvICPAAIgKBIg");
	this.shape_6.setTransform(-15.45,6.3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFCC00").s().p("Ah3CUIAtknIBeAAIghDaICFAAIgLBNg");
	this.shape_7.setTransform(-41.175,6.3);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#FF9900").ss(5,1,1).p("AyllsMAlLAAAIAALZMglLAAAg");
	this.shape_8.setTransform(45,6.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#CC0000").s().p("AylFtIAArZMAlLAAAIAALZg");
	this.shape_9.setTransform(45,6.55);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#FF9900").ss(10,1,1).p("AyllsMAlLAAAIAALZMglLAAAg");
	this.shape_10.setTransform(45,6.55);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FF9900").s().p("AhACUIAMhSIBVAAIgMBSgAgeAhIAIi0IBXAAIgwC0g");
	this.shape_11.setTransform(140.875,6.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FF9900").s().p("AhyB3QgmgmAAhAQAAgjALgfQALgfAVgYQAXgZAfgMQAegNAkgBQBCABAmAkQAmAlAABBQAAAjgKAfQgLAfgVAWQgXAagfANQgfAOgkAAQhCgBgmgkgAgog2QgTAdAAAsQAAAeANARQANAQAZAAQAeAAATgeQATgdAAgvQAAgbgOgQQgNgPgYAAQgeAAgTAcg");
	this.shape_12.setTransform(116.925,6.3);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FF9900").s().p("AhxB1QgjglAAg+QAAgkAKgeQALggAUgWQAXgbAegNQAdgMAlAAQA9AAAjAcQAjAcAGA1IhXAAQgEgSgMgJQgNgKgUAAQgeAAgSAcQgUAdABAtQAAAfAMAPQAOARAZgBQAQAAAOgIQANgJAJgPIgpAAIAKg8ICAAAIgYCdIg8AAIgCgWQgPAPgVAIQgUAHgYAAQg6AAgjgmg");
	this.shape_13.setTransform(84.9,6.35);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FF9900").s().p("AhjCAQgjgbAAgwIBbAAIAAABQAAAQAMAJQALAJAUAAQAQAAAIgGQAIgGAAgMQAAgOgkgQIgOgGQg0gXgSgTQgTgVAAgeQAAgqAggYQAfgXA2AAQA4AAAhAZQAhAZADAtIhYAAQgCgPgJgHQgKgHgRAAQgLAAgHAFQgIAGAAAJQAAANAsASIAcAMQAjAQARAUQARAVAAAcQAAAtghAZQghAZg8AAQg+AAgjgbg");
	this.shape_14.setTransform(41.875,6.325);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FF9900").s().p("AgZA5IAAhxIAzAAIAABxg");
	this.shape_15.setTransform(25.05,-2.15);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FF9900").s().p("AhTCUIAhjcIhUAAIAMhLIEBAAIgNBLIhQAAIggDcg");
	this.shape_16.setTransform(10.725,6.3);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FF9900").s().p("AiHCUIAtknIDiAAIgKBHIiHAAIgHAoIB4AAIgLBBIh3AAIgGAvICPAAIgKBIg");
	this.shape_17.setTransform(-15.45,6.3);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FF9900").s().p("Ah3CUIAtknIBeAAIghDaICFAAIgLBNg");
	this.shape_18.setTransform(-41.175,6.3);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#990000").s().p("AylFtIAArZMAlLAAAIAALZg");
	this.shape_19.setTransform(45,6.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_9},{t:this.shape_10},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_19},{t:this.shape_10},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-79,-34.9,248,83);


(lib.ACC = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AAAl7ILQGZIAAFeIrQmZIrPGZIAAleg");
	this.shape.setTransform(-101,-55.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFCC00").s().p("AAAgdIrPGZIAAleILPmZILQGZIAAFeg");
	this.shape_1.setTransform(-101,-55.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(3,1,1).p("AAAl7ILQGZIAAFeIrQmZIrPGZIAAleg");
	this.shape_2.setTransform(-101,-55.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CC0000").s().p("AAAgdIrPGZIAAleILPmZILQGZIAAFeg");
	this.shape_3.setTransform(-101,-55.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_1},{t:this.shape_2}]},1).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-174.5,-95.4,147,79);


(lib.WhiteRectangle = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,1,1).p("Eg4jglLMBxHAAAMAAABKXMhxHAAAg");
	this.shape.setTransform(2.025,11.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Eg4jAlMMAAAhKXMBxHAAAMAAABKXg");
	this.shape_1.setTransform(2.025,11.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-360.9,-227.9,725.9,477.9);


(lib.Track = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AF+zoIBOAAIhagkAHey7IhggtIhPgkIBDAAIhUgjIAQAAMBVBAAAMADMAkGAK0xXIh3g4IBpAAIhtgsIhtgtAHey7IBbAAAI9yPIhfgsAPPwWIihhBIiIg4ANBwWICOAAAK0xXIB6AAANBwWIiNhBADl0vIA5AAAEv0MIhKgjAns0vILRAAAPtvGIishQAVrttIjYhZIjEhQASrttIDAAAAWKsFIjfhoIi+hZICmAAAZqsFIj/hoAWKsFIDgAAAaeqFIkUiAAfmnsIE1AAIl2iZIk7iAEAlhgE8Il7iwIlIiZIEHAAEAzegBjIoTjZImwiwEAsygBjIGsAAEAlhgE8IFqAAEAsygBjInRjZEBcsAUwIAPlZIwTmqIuIlxIrCkfEA2dAC8IIDAAEBC2AItIsZlxIprkfEBC2AItIJyAAEBcsAUwI52sDEg3+gBjIIYjZIG1iwIF6iZIE+iAIEChoIDbhZIDGhQICihBICKg4IBugsIBugtIBJAAIBPgkIBKgjEg3+gBjIG5AAIHTjZIF9iwIFJiZIEWiAIDghoIC/hZEgoxgHsIE8AAEgvmgE8IF0AAAzWwWICMAAICNhBIB4g4IBggsIBggtAw0xXIB3AAAp00MIA+AAAp00MIBWgjIAyAAEhaaAMWMAAXghFMBGTAAAIIUAAICQAAIAuAAAs8y7IBXAAArOzoIBagkAuqyPIBlAAA53ttIDBAAA95sFIDjAAA2cvGIClAAICthQEgi3gKFIELAAEhDIAC8IIUAAIJvkfEhRaAItIKKAAIMclxEhRaAItIOSlxILKkfEhc6ASvICgmZIJAjpEhc6ASvIVqqCEhc6ASvMC5mACB");
	this.shape.setTransform(50.175,4.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("EBC2AIcIJyAAIQTGqIgPFYgEhaaAMEIJAjoIKKAAI1qKCgEA2dACrIprkfIGsAAILCEfgEhDIACrILKkfIG5AAIpvEfgEAlhgFNIl7iwIE1AAIGwCwgEgvmgFNIG1iwIE8AAIl9CwgAaeqWIkUiAIDgAAIE7CAgEgi3gKWIE+iAIDjAAIkWCAgASrt/Ii+hYICmAAIDYBYgA53t/IDbhYIClAAIi/BYgANBwnIiNhCIB6AAIChBCgAzWwnICihCIB3AAIiNBCgAI9ygIhfgtIBbAAIBtAtgAuqygIBugtIBXAAIhgAtgAF+z5IhPglIBDAAIBaAlgArOz5IBaglIA+AAIhPAlg");
	this.shape_1.setTransform(50.175,5.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#333A3F").s().p("EhczASvIVqqCIMclxIJwkfIHTjZIF9iwIFIiZIEWiAIDghoIC/hZICthQICNhBIB4g4IBggsIBggtIBPgkIBKgjILRAAIBKAjIBPAkIBgAtIBfAsIB4A4ICMBBICsBQIC+BZIDfBoIEUCAIFICZIF7CwIHRDZIJrEfIMZFxIZ3MDg");
	this.shape_2.setTransform(49.45,4.225);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#B8EBB5").s().p("EBLYALaIuIlxIrCkhIoTjXImwixIl2iYIk7iBIj/hoIjYhYIjEhQIihhCIiIg3IhtgtIhtgsIhaglIhUgiIAQAAMBVBAAAMADMAkFgEhbTgSCMBGTAAAIIUAAICQAAIAuAAIhWAiIhaAlIhuAsIhuAtIiKA3IiiBCIjGBQIjbBYIkCBoIk+CBIl6CYIm1CxIoYDXIrKEhIuSFxIpADog");
	this.shape_3.setTransform(58.175,-13.025);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#CC0000").s().p("EBFPAOuIsZlxIIDAAIOJFxgEhPAAOuIORlxIIUAAIscFxgEAvLAEdInRjZIFrAAIISDZgEg1kAEdIIXjZIF1AAInTDZgEAh/gBrIlIiZIEHAAIF2CZgEgmXgBrIF5iZIELAAIlICZgAYjmEIjfhoIDBAAID+BogA7gmEIEChoIDBAAIjgBogASGpEIishQICOAAIDEBQgA0DpEIDGhQICMAAIitBQgANOrWIh4g4IBpAAICIA4gAubrWICKg4IBlAAIh4A4gAJ3s6IhggsIBOAAIBtAsgAqjs6IBugsIBJAAIhgAsgAHIuLIhKgiIA5AAIBVAigAnauLIBVgiIAyAAIhKAig");
	this.shape_4.setTransform(34.85,-34.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(1,1,1).p("AHey7IhggtIBOAAIhagkAKmyPIhtgsIhtgtAI9yPIBpAAAK0xXIh3g4IhfgsIBbAAANBwWICOAAIihhBAK0xXIB6AAIiIg4ANBwWIiNhBAEv0MIhKgjIA5AAIAQAAMBVBAAAMADMAkGAns0vILRAAAF+zoIhPgkIBDAAIhUgjAPtvGIishQAWKsFIjfhoIDAAAIjYhZAaeqFIkUiAIDgAAIj/hoAfmnsIE1AAIl2iZEAlhgE8Il7iwIlIiZIEHAAIk7iAAPtvGICmAAIjEhQASrttIi+hZEAzegBjIoTjZImwiwEAsygBjIGsAAEAsygBjInRjZIFqAAEBcsAUwIAPlZIwTmqIuIlxIrCkfEBC2AItIsZlxIIDAAEBcsAUwI52sDIJyAAEA2dAC8IprkfEg3+gBjIIYjZIG1iwIF6iZIE+iAIEChoIDbhZIDGhQICihBICKg4IBugsIBugtIBagkIBWgjIAyAAEg3+gBjIG5AAIHTjZIF9iwIFJiZIEWiAIDghoIC/hZICthQICNhBIB4g4IBggsEgoxgHsIE8AAEgvmgE8IF0AAAw0xXIB3AAAzWwWICMAAEhaaAMWMAAXghFMBGTAAAIIUAAICQAAIAuAAAp00MIA+AAIBKgjAs8y7IBXAAIBggtArOzoIBJAAIBPgkAuqyPIBlAAA53ttIDBAAA95sFIDjAAA2cvGIClAAEgi3gKFIELAAEhDIAC8IIUAAIJvkfEhRaAItIKKAAIMclxEhRaAItIOSlxILKkfEhc6ASvICgmZIJAjpEhc6ASvIVqqCEhc6ASvMC5mACB");
	this.shape_5.setTransform(50.175,4.225);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#CC0000").s().p("EBC2AIcIJyAAIQTGqIgPFYgEhaaAMEIJAjoIKKAAI1qKCgEA2dACrIprkfIGsAAILCEfgEhDIACrILKkfIG5AAIpvEfgEAlhgFNIl7iwIE1AAIGwCwgEgvmgFNIG1iwIE8AAIl9CwgAaeqWIkUiAIDgAAIE7CAgEgi3gKWIE+iAIDjAAIkWCAgASrt/Ii+hYICmAAIDYBYgA53t/IDbhYIClAAIi/BYgANBwnIiNhCIB6AAIChBCgAzWwnICihCIB3AAIiNBCgAI9ygIhfgtIBbAAIBtAtgAuqygIBugtIBXAAIhgAtgAF+z5IhPglIBDAAIBaAlgArOz5IBaglIA+AAIhPAlg");
	this.shape_6.setTransform(50.175,5.95);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("EBFPAOuIsZlxIIDAAIOJFxgEhPAAOuIORlxIIUAAIscFxgEAvLAEdInRjZIFrAAIISDZgEg1kAEdIIXjZIF1AAInTDZgEAh/gBrIlIiZIEHAAIF2CZgEgmXgBrIF5iZIELAAIlICZgAYjmEIjfhoIDBAAID+BogA7gmEIEChoIDBAAIjgBogASGpEIishQICOAAIDEBQgA0DpEIDGhQICMAAIitBQgANOrWIh4g4IBpAAICIA4gAubrWICKg4IBlAAIh4A4gAJ3s6IhggsIBOAAIBtAsgAqjs6IBugsIBJAAIhgAsgAHIuLIhKgiIA5AAIBVAigAnauLIBVgiIAyAAIhKAig");
	this.shape_7.setTransform(34.85,-34.3);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#000000").ss(1,1,1).p("AF+zoIBOAAIhagkIhUgjIAQAAMBVBAAAMADMAkGAHey7IhggtIhPgkIhKgjIA5AAAK0xXIh3g4IBpAAIhtgsIhtgtAHey7IBbAAAI9yPIhfgsANBwWICOAAIihhBANBwWIiNhBIB6AAIiIg4Ans0vILRAAAPtvGIishQAEv0MIBDAAAWKsFIjfhoIDAAAIjYhZAaeqFIkUiAIDgAAIj/hoAfmnsIE1AAIl2iZEAlhgE8Il7iwIlIiZIEHAAIk7iAAPtvGICmAAIjEhQASrttIi+hZEAsygBjIGsAAIoTjZEAsygBjInRjZIFqAAImwiwEBcsAUwIAPlZIwTmqEBC2AItIsZlxIIDAAEBcsAUwI52sDIJyAAIuIlxIrCkfEA2dAC8IprkfEg3+gBjIG5AAIHTjZIF9iwIFJiZIEWiAIDghoIC/hZICthQICNhBIB4g4IBggsIBggtEg3+gBjIIYjZIF0AAEgoxgHsIE8AAEgoxgHsIF6iZIELAAEgvmgE8IG1iwAw0xXIB3AAAw0xXICKg4IBlAAAzWwWICMAAAzWwWICihBAp00MIA+AAIBKgjAp00MIBWgjIAyAAEhaaAMWMAAXghFMBGTAAAIIUAAICQAAIAuAAAs8y7IBugtIBagkAs8y7IBXAAArOzoIBJAAIBPgkAuqyPIBugsA53ttIDBAAA53ttIDbhZIClAAA95sFIDjAAA95sFIEChoA2cvGIDGhQEgi3gKFIE+iAEhDIAC8IIUAAIJvkfEhRaAItIKKAAIMclxEhRaAItIOSlxILKkfEhc6ASvICgmZIJAjpEhc6ASvIVqqCEhc6ASvMC5mACB");
	this.shape_8.setTransform(50.175,4.225);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#000000").ss(1,1,1).p("AHey7IhggtIBOAAIhagkIhUgjAKmyPIhtgsIhtgtAI9yPIBpAAAK0xXIh3g4IhfgsIBbAAAPPwWIihhBIiIg4ANBwWICOAAANBwWIiNhBIB6AAADl0vIA5AAIAQAAMBVBAAAMADMAkGAEv0MIhKgjAns0vILRAAAPtvGIishQAEv0MIBDAAAF+zoIhPgkAVrttIjYhZIjEhQASrttIDAAAAWKsFIjfhoIi+hZICmAAAZqsFIj/hoAWKsFIDgAAAaeqFIkUiAAfmnsIE1AAIl2iZIk7iAEAlhgE8Il7iwIlIiZIEHAAEAsygBjIGsAAIoTjZEAlhgE8IFqAAImwiwEAsygBjInRjZEBcsAUwIAPlZIwTmqEA2dAC8IIDAAIrCkfEBC2AItIsZlxIprkfEBC2AItIJyAAIuIlxEBcsAUwI52sDEg3+gBjIG5AAIHTjZIF9iwIFJiZIEWiAIDghoIC/hZEg3+gBjIIYjZIF0AAEgoxgHsIE8AAEgoxgHsIF6iZIELAAEgvmgE8IG1iwAzWwWICMAAICNhBIB4g4IBggsIBggtIBPgkIBKgjAzWwWICihBIB3AAAw0xXICKg4IBlAAEhaaAMWMAAXghFMBGTAAAIIUAAICQAAIAuAAIAyAAAp00MIBWgjAp00MIA+AAAs8y7IBugtIBJAAAs8y7IBXAAArOzoIBagkAuqyPIBugsA53ttIDBAAA53ttIDbhZIClAAICthQA95sFIDjAAA95sFIEChoA2cvGIDGhQEgi3gKFIE+iAEhDIAC8IIUAAIJvkfEhRaAItIKKAAIMclxEhRaAItIOSlxILKkfEhc6ASvICgmZIJAjpEhc6ASvIVqqCEhc6ASvMC5mACB");
	this.shape_9.setTransform(50.175,4.225);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#000000").ss(1,1,1).p("AF+zoIBOAAIhagkAHey7IhggtIhPgkIBDAAIhUgjIAQAAMBVBAAAMADMAkGAK0xXIh3g4IBpAAIhtgsIhtgtAHey7IBbAAAI9yPIhfgsAPPwWIihhBIiIg4ANBwWICOAAAK0xXIB6AAANBwWIiNhBADl0vIA5AAAEv0MIhKgjAns0vILRAAAPtvGIishQAVrttIjYhZIjEhQASrttIDAAAAWKsFIjfhoIi+hZICmAAAZqsFIj/hoAWKsFIDgAAAaeqFIkUiAAfmnsIE1AAIl2iZIk7iAEAlhgE8Il7iwIlIiZIEHAAEAzegBjIoTjZImwiwEAsygBjIGsAAEAlhgE8IFqAAEAsygBjInRjZEBcsAUwIAPlZIwTmqIuIlxIrCkfEA2dAC8IIDAAEBC2AItIsZlxIprkfEBC2AItIJyAAEBcsAUwI52sDEg3+gBjIIYjZIG1iwIF6iZIE+iAIEChoIDbhZIDGhQICihBICKg4IBugsIBugtIBagkIA+AAIBKgjEg3+gBjIG5AAIHTjZIF9iwIFJiZIEWiAIDghoIC/hZEgoxgHsIE8AAEgvmgE8IF0AAAzWwWICMAAICNhBIB4g4IBggsIBggtIBPgkAw0xXIB3AAAp00MIBWgjIAyAAEhaaAMWMAAXghFMBGTAAAIIUAAICQAAIAuAAAs8y7IBXAAArOzoIBJAAAuqyPIBlAAA53ttIDBAAA95sFIDjAAA2cvGIClAAICthQEgi3gKFIELAAEhDIAC8IIUAAIJvkfEhRaAItIKKAAIMclxEhRaAItIOSlxILKkfEhc6ASvICgmZIJAjpEhc6ASvIVqqCEhc6ASvMC5mACB");
	this.shape_10.setTransform(50.175,4.225);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#000000").ss(1,1,1).p("AHey7IhggtIBOAAIhagkAKmyPIhtgsIhtgtAI9yPIBpAAAK0xXIh3g4IhfgsIBbAAANBwWICOAAIihhBAK0xXIB6AAIiIg4ANBwWIiNhBAEv0MIhKgjIA5AAIAQAAMBVBAAAMADMAkGAns0vILRAAAF+zoIhPgkIBDAAIhUgjAPtvGIishQAWKsFIjfhoIDAAAIjYhZAaeqFIkUiAIDgAAIj/hoAfmnsIE1AAIl2iZEAlhgE8Il7iwIlIiZIEHAAIk7iAAPtvGICmAAIjEhQASrttIi+hZEAzegBjIoTjZImwiwEAsygBjIGsAAEAsygBjInRjZIFqAAEBcsAUwIAPlZIwTmqIuIlxIrCkfEBC2AItIsZlxIIDAAEBcsAUwI52sDIJyAAEA2dAC8IprkfEg3+gBjIIYjZIG1iwIF6iZIE+iAIEChoIDbhZIDGhQICihBICKg4IBugsIBugtIBagkIBWgjIAyAAEg3+gBjIG5AAIHTjZIF9iwIFJiZIEWiAIDghoIC/hZICthQICNhBIB4g4IBggsIBggtIBPgkIBKgjEgoxgHsIE8AAEgvmgE8IF0AAAw0xXIB3AAAzWwWICMAAEhaaAMWMAAXghFMBGTAAAIIUAAICQAAIAuAAAp00MIA+AAAs8y7IBXAAArOzoIBJAAAuqyPIBlAAA53ttIDBAAA95sFIDjAAA2cvGIClAAEgi3gKFIELAAEhDIAC8IIUAAIJvkfEhRaAItIKKAAIMclxEhRaAItIOSlxILKkfEhc6ASvICgmZIJAjpEhc6ASvIVqqCEhc6ASvMC5mACB");
	this.shape_11.setTransform(50.175,4.225);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(1,1,1).p("AF+zoIBOAAIhagkIhUgjIAQAAMBVBAAAMADMAkGAHey7IhggtIhPgkIhKgjIA5AAAK0xXIh3g4IBpAAIhtgsIhtgtAHey7IBbAAAI9yPIhfgsANBwWICOAAIihhBANBwWIiNhBIB6AAIiIg4Ans0vILRAAAPtvGIishQAEv0MIBDAAAWKsFIjfhoIDAAAIjYhZAaeqFIkUiAIDgAAIj/hoAfmnsIE1AAIl2iZEAlhgE8Il7iwIlIiZIEHAAIk7iAAPtvGICmAAIjEhQASrttIi+hZEAsygBjIGsAAIoTjZEAsygBjInRjZIFqAAImwiwEBcsAUwIAPlZIwTmqEBC2AItIsZlxIIDAAEBcsAUwI52sDIJyAAIuIlxIrCkfEA2dAC8IprkfEg3+gBjIG5AAIHTjZIF9iwIFJiZIEWiAIDghoIC/hZICthQICNhBIB4g4IBggsIBggtIBPgkIBKgjEg3+gBjIIYjZIF0AAEgoxgHsIE8AAEgoxgHsIF6iZIELAAEgvmgE8IG1iwAw0xXIB3AAAw0xXICKg4IBlAAAzWwWICMAAAzWwWICihBAp00MIA+AAAp00MIBWgjIAyAAEhaaAMWMAAXghFMBGTAAAIIUAAICQAAIAuAAAs8y7IBugtIBJAAAs8y7IBXAAArOzoIBagkAuqyPIBugsA53ttIDBAAA53ttIDbhZIClAAA95sFIDjAAA95sFIEChoA2cvGIDGhQEgi3gKFIE+iAEhDIAC8IIUAAIJvkfEhRaAItIKKAAIMclxEhRaAItIOSlxILKkfEhc6ASvICgmZIJAjpEhc6ASvIVqqCEhc6ASvMC5mACB");
	this.shape_12.setTransform(50.175,4.225);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#000000").ss(1,1,1).p("AHey7IhggtIBOAAIhagkIhUgjAKmyPIhtgsIhtgtAI9yPIBpAAAK0xXIh3g4IhfgsIBbAAAPPwWIihhBIiIg4ANBwWICOAAANBwWIiNhBIB6AAADl0vIA5AAIAQAAMBVBAAAMADMAkGAEv0MIhKgjAns0vILRAAAPtvGIishQAEv0MIBDAAAF+zoIhPgkAVrttIjYhZIjEhQASrttIDAAAAWKsFIjfhoIi+hZICmAAAZqsFIj/hoAWKsFIDgAAAaeqFIkUiAAfmnsIE1AAIl2iZIk7iAEAlhgE8Il7iwIlIiZIEHAAEAsygBjIGsAAIoTjZEAlhgE8IFqAAImwiwEAsygBjInRjZEBcsAUwIAPlZIwTmqEA2dAC8IIDAAIrCkfEBC2AItIsZlxIprkfEBC2AItIJyAAIuIlxEBcsAUwI52sDEg3+gBjIG5AAIHTjZIF9iwIFJiZIEWiAIDghoIC/hZEg3+gBjIIYjZIF0AAEgoxgHsIE8AAEgoxgHsIF6iZIELAAEgvmgE8IG1iwAzWwWICMAAICNhBIB4g4IBggsIBggtAzWwWICihBIB3AAAw0xXICKg4IBlAAEhaaAMWMAAXghFMBGTAAAIIUAAICQAAIAuAAIAyAAAp00MIBWgjAp00MIA+AAIBKgjAs8y7IBugtIBJAAIBPgkAs8y7IBXAAArOzoIBagkAuqyPIBugsA53ttIDBAAA53ttIDbhZIClAAICthQA95sFIDjAAA95sFIEChoA2cvGIDGhQEgi3gKFIE+iAEhDIAC8IIUAAIJvkfEhRaAItIKKAAIMclxEhRaAItIOSlxILKkfEhc6ASvICgmZIJAjpEhc6ASvIVqqCEhc6ASvMC5mACB");
	this.shape_13.setTransform(50.175,4.225);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#000000").ss(1,1,1).p("AHey7IhggtIBOAAIhagkIhUgjAKmyPIhtgsIhtgtAI9yPIBpAAAK0xXIh3g4IhfgsIBbAAAPPwWIihhBIiIg4ANBwWICOAAANBwWIiNhBIB6AAADl0vIA5AAIAQAAMBVBAAAMADMAkGAEv0MIhKgjAns0vILRAAAPtvGIishQAEv0MIBDAAAF+zoIhPgkAVrttIjYhZIjEhQASrttIDAAAAWKsFIjfhoIi+hZICmAAAZqsFIj/hoAWKsFIDgAAAaeqFIkUiAAfmnsIE1AAIl2iZIk7iAEAlhgE8Il7iwIlIiZIEHAAEAsygBjIGsAAIoTjZEAlhgE8IFqAAImwiwEAsygBjInRjZEBcsAUwIAPlZIwTmqEA2dAC8IIDAAIrCkfEBC2AItIsZlxIprkfEBC2AItIJyAAIuIlxEBcsAUwI52sDEg3+gBjIG5AAIHTjZIF9iwIFJiZIEWiAIDghoIC/hZEg3+gBjIIYjZIF0AAEgoxgHsIE8AAEgoxgHsIF6iZIELAAEgvmgE8IG1iwAzWwWICMAAICNhBIB4g4IBggsIBggtAzWwWICihBIB3AAAw0xXICKg4IBlAAEhaaAMWMAAXghFMBGTAAAIIUAAICQAAIAuAAIAyAAAp00MIBWgjAp00MIA+AAIBKgjAs8y7IBugtIBagkAs8y7IBXAAArOzoIBJAAIBPgkAuqyPIBugsA53ttIDBAAA53ttIDbhZIClAAICthQA95sFIDjAAA95sFIEChoA2cvGIDGhQEgi3gKFIE+iAEhDIAC8IIUAAIJvkfEhRaAItIKKAAIMclxEhRaAItIOSlxILKkfEhc6ASvICgmZIJAjpEhc6ASvIVqqCEhc6ASvMC5mACB");
	this.shape_14.setTransform(50.175,4.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_2},{t:this.shape_3},{t:this.shape_5}]},2).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape_8}]},2).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_2},{t:this.shape_3},{t:this.shape_9}]},2).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape_8}]},2).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_2},{t:this.shape_3},{t:this.shape_9}]},2).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape_10}]},2).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_2},{t:this.shape_3},{t:this.shape_11}]},2).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape_10}]},2).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_2},{t:this.shape_3},{t:this.shape_11}]},2).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape_12}]},2).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_2},{t:this.shape_3},{t:this.shape_13}]},2).to({state:[{t:this.shape_2},{t:this.shape_7},{t:this.shape_6},{t:this.shape_3},{t:this.shape_14}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-545.5,-129.5,1191.4,267.5);


(lib.TalkingBackground = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#333333").ss(1,1,1).p("EBWMgV3ICpAAIAAD8IAABEIAAdNIAAD8IAABDIAAJjMixpAAAIAApjIAAk/IMgAAIMgAAIMgAAIMgAAIMgAAIMgAAIMgAAIMfAAIMgAAIMhAAIMfAAIMgAAIMhAAIMgAAICpAAEhY0gV3IAAlAMCxpAAAIAAFAEBWMgQ3ICpAAEBWMgQ3ICphEEBWMARVICpAAEBY1AQSIipBDIsgAAIMgk/At013IMgAAIMfAAIMgAAIMhAAIMfAAIMgAAIMhAAIMgAAEhY0gV3IMgAAIMgAAIMgAAIMgAAIMgAAIMgAAEgm0gQ3IMgAAIMglAEg/0gQ3IMgAAIMgAAIMglAEg/0ARVIMgAAIMgAAIMgAAIMgAAIMgAAIMfAAIMgAAIMhAAIMfAAIMgAAIMhAAEg/0ARVIMgk/Egm0ARVIMgk/EgzUARVIMgk/EhY0gQ3IMgAAIMgAAIMglAEhY0ARVIMgAAIMgAAEhY0ARVIMgk/EhY0AMWIAA9NIAAlAEhMUARVIMgk/EA9LgQ3IMhAAIMglAEAkMgQ3IMfAAIMgAAIMhlAEAkMARVIMfk/EA9LARVIMhk/EAwrARVIMgk/ALLw3IMgAAIMhAAIMflAAt0w3IMgAAIMfAAIMglAAt0RVIMgk/ALLRVIMgk/AhURVIMfk/AXrRVIMhk/At0w3IMglAEAwrgQ3IMglAAXrw3IMhlAAhUw3IMflAEgzUgQ3IMglAEhY0gQ3IMglAEhMUgQ3IMglAA6Uw3IMgAAA6URVIMgk/EBJsgQ3IMgAA");
	this.shape.setTransform(107.5,125.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#666666").s().p("EBWMAOnIsgAAIshAAIsgAAIsgAAIsgAAIsgAAIseAAIsgAAIsgAAIsgAAIshAAIsgAAIsgAAIsgAAIAA9NIMgAAIMgAAIMgAAIMhAAIMgAAIMgAAIMgAAIMeAAIMgAAIMgAAIMgAAIMgAAIMhAAIMgAAICpAAIAAdNg");
	this.shape_1.setTransform(107.5,110.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#990000").s().p("EBWMATnICphEIAABEgEA9LATnIMhlAIMgAAIsgFAgEAkLATnIMglAIMgAAIsgFAgALLTnIMglAIMgAAIsgFAgAtzTnIMglAIMeAAIseFAgEgmzATnIMglAIMgAAIsgFAgEg/0ATnIMglAIMhAAIshFAgEhY0ATnIMglAIMgAAIsgFAgEBWMgOmICphDIAABDgEA9LgOmIMhk/IMgAAIsgE/gEAkLgOmIMgk/IMgAAIsgE/gALLumIMgk/IMgAAIsgE/gAtzumIMgk/IMeAAIseE/gEgmzgOmIMgk/IMgAAIsgE/gEg/0gOmIMgk/IMhAAIshE/gEhY0gOmIMgk/IMgAAIsgE/g");
	this.shape_2.setTransform(107.5,110.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("EBJsATnIMglAICpAAIAAD8IipBEgEAwrATnIMglAIMhAAIshFAgAXrTnIMglAIMgAAIsgFAgAhTTnIMelAIMgAAIsgFAgA6TTnIMglAIMgAAIsgFAgEgzUATnIMhlAIMgAAIsgFAgEhMUATnIMglAIMgAAIsgFAgEhY0AOnIMgAAIsgFAgEBJsgOmIMgk/ICpAAIAAD8IipBDgEAwrgOmIMgk/IMhAAIshE/gAXrumIMgk/IMgAAIsgE/gAhTumIMek/IMgAAIsgE/gA6TumIMgk/IMgAAIsgE/gEgzUgOmIMhk/IMgAAIsgE/gEhMUgOmIMgk/IMgAAIsgE/gEhY0gTlIMgAAIsgE/g");
	this.shape_3.setTransform(107.5,110.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#CCCCCC").s().p("EhY0Aa4IAApjIMgAAIMgAAIMgAAIMhAAIMgAAIMgAAIMgAAIMeAAIMgAAIMgAAIMgAAIMgAAIMhAAIMgAAICpAAIAAJjgEBWMgV3IsgAAIshAAIsgAAIsgAAIsgAAIsgAAIseAAIsgAAIsgAAIsgAAIshAAIsgAAIsgAAIsgAAIAAlAMCxpAAAIAAFAg");
	this.shape_4.setTransform(107.5,125.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-461.9,-47.9,1138.9,345.9);


(lib.Right = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("Aiav2IBkAAIThftIjIAAgAw8v2IhuAAIAAftIDIAAIha/tIOiAAAviP3IfFAA");
	this.shape.setTransform(39.5,20.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFCC00").s().p("APjP3Ix9/tIBkAAIThftgAyqP3IAA/tIBuAAIBaftg");
	this.shape_1.setTransform(39.5,20.525);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#333333").s().p("Au1P3Iha/tIOiAAIR9ftg");
	this.shape_2.setTransform(35,20.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-81,-81.9,241,204.9);


(lib.Middle = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AV/P3IEKAAIse/tIiMAAI0xAAIh+AAIu4ftID8AAIM6/tAV/P3Iqg/tAV/P3MgsLAAA");
	this.shape.setTransform(39.5,20.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFCC00").s().p("AV/P3Iqg/tICMAAIMeftgA6IP3IO4/tIB+AAIs6ftg");
	this.shape_1.setTransform(39.5,20.525);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#333333").s().p("A2FP3IM6/tIUxAAIKgftg");
	this.shape_2.setTransform(38.8,20.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-128.8,-81.9,336.6,204.9);


(lib.Flag = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("ANB5UQCRASCFAwQA8CJAeCKQAkCggECgQgDCXgmCXAlZ2vQAKgBAKgBQBrgLBvgXQAqgIArgKQBPgUBSgZQCCglB7gTQBaBtAqCSQAkB9ACCXQABCSgfCqQCdgNCcAgQAYAFAYAGQgSB5geCBQCAAaCAA4QA6iBAhh/ADe0ZQBXgVBTgNQBDgLBBgFQChgMCUASQAkAEAkAHQAUCKgECeQgDCSgZCjIErBMAEKv9QBqgkBqgOQAggFAggBQAKgCAKAAQCSgJCSAdQAYAFAZAHIASAFIE4BTAgyt9QABgBAAAAQBigiBjgxQAegNAegMQAcgKAdgJQAAAAABAAQAJCagUCgQBrgjBrgPQAggEAfgCQgXB/goCNQC8gaC8AmAhIzLQAZgFAZgHQBPgTBSgaQAqgMApgJQAjCLAJCRAkYtFQAFAAAFgBQBdgQBdgdQALgEAKgDQAHgCAGgBQADCigLCXQBighBjgxQAegOAegLQAcgKAcgKQgRCLgnCOQCHgzCHgSAo3yYQAIAAAIAAQBlABBpgKQAKgBAKgBQAJAAAJgCQBigLBmgUQASgEARgDQATCsADCiAs5yxQAgAFAgAFQBgAMBiADQgGC0AGCuQARABAQABQATAAASAAQA1AAA0gDQA1gEA1gJQADAAADgBQAFCdgECdQBdgRBdgcQAKgEALgDQAHgDAHgCQgLCOgYCDQAKgEALgCQBpgjBqg1QAegNAegMAon2nQgMCJgECGAtStnQAXAHAWAGQAmAIAlAIQBSAPBRAFQAGChASCbQAOCFAXCCQA0AAA1gEQA1gEA1gJQBlgQBlgfAsuogQAlAJAmAHQBiASBiAEQASABATAAQA0AAA1gDQA1gFA1gIQAIgCAIAAQgFCDgLCEAtStnQADCjAhCkQAbCJAwCMQB0AWB1ACAkzylQAUCxAHCvAs5yxQgcCkADCmAOJ06QBqATC+AoACL4SQA0B6AfB/AlZ2vQAXCFAPCFAhr3TQAWCHANCBAr522QBnAOBrABQBlABBpgJAr522QgqCCgWCDANB5UQAyCCAWCYAGI5KQDogkDRAaAyP4SQgZgDgTgTQgMgMgGgQQgEgLAAgOQAAgfAWgWQAWgWAfAAQAdAAAWAUQABABABABQAWAWAAAfQAAAggWAVQgSATgZADIAPAAIAAEOIAAExIAAE9IAAEFMAAAAg6IgyAAMAAAgy7IAQAAIATAAQgFAAgFAAQgEAAgFAAgAxtvTQCSBGCJAmAxt4SQC0BDDAAZAxt0EQCWA4CeAbAxtmRQDFBiDFAkAxtqWQCfBPCgAn");
	this.shape.setTransform(87.4157,-448.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCCCCC").s().p("AgYaoMAAAgy6IAQAAIAIAAIAJAAIgRAAQgagDgSgSQgNgNgFgQQgEgLAAgNQAAggAWgVQAWgXAeAAQAdABAVATIADADQAWAVAAAgQAAAegWAXQgTASgZADIAPAAIAAEOIAAExIAAE8IAAEGMAAAAg5g");
	this.shape_1.setTransform(-28.45,-448.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("ApRGqIAlAAQA1AAA0gDQA1gEA1gJIAQgCQgECEgMCEQg1AIg1AFQg0ADg1AAQgWiCgPiEgAyfITIAAkGQCgBPCfAoQggilgEiiIAuAMQAlAJAmAHQBRAPBSAGQAGChARCbQhigEhigTQglgHgmgIQAbCJAwCMQjFgljFhhgAhsFgIgOAEIgVAHQhdAdhdAQQAFidgGicIALgCQBdgQBdgdIAVgGIANgEQgEiggSisIAxgMQBPgTBSgaQAqgMAqgKQAiCLAJCSIgBAAQgcAJgcAKIg8AZQhjAvhiAjIgBAAQADCigMCYQBjgiBigxIA8gYQAcgLAdgJQATihgJiYQBqgkBrgPQAggEAfgCIAUgCQABCSgeCpQCcgMCcAfIAxAMQgTB4geCCQi8gmi8AZQApiMAXiAQggACggAFQhrAPhqAjQgSCKgnCPIg8AZQhpA0hqAjIgVAGQAYiDALiNgANMDHQAYijAEiSIgTgFIgwgLQiSgdiTAIQgBiXgkh8QCggNCVASQAkAFAkAGQgWiXgyiCQCQASCGAvQA7CKAfCJQi+gnhqgUQATCLgDCdIE4BUQgECVgmCXgApHBvIghgBQgHitAGi1IAQAAQBmACBogKIAVgCIASgCQgQiFgXiGIAVgCQBrgLBugWQAWCGAOCCIgkAHQhlAUhiALQAUCwAGCvIgFABQg1AIg1AFQg1ADg0AAIglgBgAyfgvIAAkwQCWA3CeAcQAWiDAriCQBnANBqACQgLCJgFCFQhigChfgMIhBgKQgcCkADClQiIgmiThGgAh5kmIAAAAgACtl1Qgfh+g1h7QCCgkB8gTQBZBtArCSQhBAFhDAKQhUAOhWAUIAAAAg");
	this.shape_2.setTransform(92.375,-541.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AsEKeQgwiMgbiJQAlAJAmAHQBiASBiAEQgSibgGihIAhACIAlAAQA1AAA0gDQA1gEA1gJIAGgBQgHivgUiwQBigLBmgUIAjgHQATCsADCgIgNAEIgVAHQhdAdhdAQIgKABQAFCdgECcQBdgQBdgdIAVgGIAOgFQgLCNgYCEQhlAfhlAQQALiEAFiEIgQADQg1AIg1AEQg1AEg0AAIglgBQAOCFAXCBQh1gBh0gWgAMsHGQAeiBASh5IgwgLQicggidANQAfirgBiQIgUABQggACggAFQhqAOhqAkQAJCZgUCgQgcAJgcALIg8AYQhjAxhiAiQALiXgDijIABAAQBigiBjgwIA8gZQAcgKAdgJIABAAQgJiRgjiLQBXgVBTgNQBDgLBBgFQAkB9ACCXQCSgJCSAdIAxALIASAFQgDCSgZCjIErBLQghCAg6CBQiAg4iAgagADeDmQBrgjBrgPQAggEAfgCQgXB/goCNQiHASiHAzQAniPARiKgAyOESIAAk7QCSBFCJAmQgDilAcikQiegbiWg4IAAkOQC0BDDAAZQgqCCgWCDIBAAKQBgAMBiADQAEiGAMiJQBlABBpgJQAXCFAPCFIgSACIgUACQhpAKhlgBIgQAAQgGC0AGCtQhRgFhSgQQglgHgmgJIgtgMQADCiAhClQiggoifhPgAhTArIAAAAgAN4hpQAEidgUiKQBqATC+AoQAkCggECggAiMopIBVgSQBPgUBSgZQA0B6AfB/QgpAJgqAMQhSAahPATIgyAMQgNiBgWiHgAC9lvIAAAAgAMgmbQiUgTihANQgqiShahtQDogkDRAaQAyCCAWCYQgkgHgkgEgAywpoIATAAIgKAAIgJAAg");
	this.shape_3.setTransform(90.7157,-542.2452);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-36.9,-619.9,248.70000000000002,342.9);


(lib.Ring = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AQogBQAAG4k4E3Qk3E3m5AAQm3AAk4k3Qk3k3AAm4QAAm4E3k4QE4k3G3AAQG5AAE3E3QE4E4AAG4gAQ+AAQAAHDk+E9Qk9E+nDAAQnCAAk9k+Qk+k+AAnCQAAnBE+k+QE+k+HBAAQHCAAE+E+QE+E+AAHBg");
	this.shape.setTransform(4.5,2.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("Ar/MAQk+k+AAnCQAAnBE+k9QE+k/HBAAQHCAAE+E/QE+E9AAHBQAAHDk+E9Qk+E+nCAAQnBAAk+k+gArvrxQk3E4AAG4QAAG3E3E3QE4E4G4AAQG3AAE4k4QE4k3AAm3QAAm4k4k4Qk4k3m3AAQm4AAk4E3g");
	this.shape_1.setTransform(4.5,2.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-105.1,-106.8,219.2,219.2);


(lib.Fire3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFCC00").s().p("AgulpIgBANIABAOYABAFAAAEABAFIABAHIACAHIADANIABADIAAABIAAAAIAAAAIAAABIABACIACAGYAAACACADABACIABAEIABACIABABIAAAAIAAAAIAAAAYAAAAABACgCgDIAAAAIAAAAIAFANIAAABIAHAQIACADYAAAAAAAAAAAAYAAgBAAABAAAAIAAABIAAAAIAAAAIAAAAIAAABIAAABIABAAIAAAAYAAABAAAAAAAAYABADACACACACIgDgEIABAFYABABAAACAAACYABACAAABAAACIAAAGIAAAGIAAADIAAABIAAAAIAAAAIAAAAYAAgBAAADAAgEIAAAAIAAABIAAACIgBAEYAAABAAABAAABIgCAEIgBAFIgBACIgBABIAAAAIAAAAIAAAAIAAAAYAAABABgCgBAAIAAAAIAAABIgHANIgOAbIABgCIgEAHIgBACIgBABIAAAAIAAAAIAAAAIgBADIgBABIgCAEYgCAFgDAFgCAFIgIASIgBAFIgCAIIgDAJYAAABAAACAAADIgBAGIAAAHIgBAEIAAABIAAABIAAABIAAABIAAAJYAAADAAACABAFIABAMYABAEABADABAEYABAEAAADACAEIAEANIACADYgBgCgBgBAAgBYgBgBAAAAAAgBYAAgBgBgBAAAAYAAgBgBgBAAgCIABAFYABAEABAEABAEYACAEACADACAEIgEgHIABADIAAABIAAAAIAAABIAAAAIAAAAIAAAAYACAEgEgJABABIAAABIABAHIADAPIACAOIABAEIAAABIAAABIAAABIAAAAIAAAAYgBgCABABAAAAIAAAAIAAAAIABAHIABAIYABADgBAAAAABYAAABAAABAAABIAAAFYAAADgBADABADIAAABIAAAAIAAAAIAAAAIAAAAYAAgCgBAHABgJIAAAAIgBACIAAAEIAAAHIABgKYAAgCABgCABgBIABgCIAAAAIAAAAIAAAAIgDAFIAAAAIAAABIAAABIgBADIgBADIgBAFYgBADgBACAAADIgBADIAAAAYAAAAAAgBAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAABIAAABIAAACYAAAAAAABAAgBIAAgBYABgDABgCABgCIgCAFYgBAFgBAFgBAGIgCAIIAAACIAAAAIAAAAIAAAAYAAABABgGgBADIAAAAIAAABIAAADIgBAFIAAACIAAAAIAAADIAAABIAAAAIAAADIgBAGIAAADIAAAFYABAHAAAHABAGYABAEAAAEABADIACAGIAAADIABABIAAAAIAAABIAAADIAAAAIAAAAIABABIADAMYACADABAEACADIACAGIABADIABABIACAIIACAEIAAABIABAAYgBACABgEAAABIAAAAIAAAAIAAAAIAAAAIAAADIADAMIACALIADAJYAAAFAAADABAEIAAACIADALYAAACAAACAAACYABACAAACAAACIAAACYAAADADADADAAYABgBABAAABgBYACgBACgCACgCYACgCABgCACgCYADgEADgEACgFIAAABYADgDACgEACgDYACgEADgFACgEIAFgLIAEgMIABgCIABgBIAAAAIAAAAIAAAAYAAAAAAgDAAABIAAgBIAAgCIACgHIACgPIABgEIAAgDIAAgGYABgEAAgEAAgEYABgDAAgEAAgEIAAgBIAAAAIAAAAYABAHgBgFAAACIAAAAIAAgBIABgBIAAgDIABgGYAAgEAAgDABgEYAAgCABAAAAgBIAAgBIABgCIACgFIAAgDIABgBIAAAAYAAgCgBAGAAgBIAAAAIAAAAIAAgBIABgBIACgFIABgDIAAgBIAAAAIAAgDIAAAAIAAAAIABAAIAAgBIABgDYABgCABgCABgCIgCAFYABgEACgFABgEIABgGIABgCIAAgBIAAABYAAAAAAABgBABYAAABAAAAAAAAIAAABIAAgBIABgDIABgBIAAgBIAAAAIAAAAIAAAAYAAgBgFAMACgFIAAAAIABAAIAAgBIABgDYACgEABgEABgEYABgCAAgDABgDIAAgBIAAgHIAAgEIABgCIAAAAIAAgFIAAAAIAAAAIAAgBYgBgHAAgGgBgGIgCgKYAAgDgBgEgBgEYgBgDgBgFgBgCIgDgHIgCgGIAAAAIgBgBIAAgBIAAAAIAAgBIgBgCIgCgDIgFgNIgGgOIgDgGIAAgCIgCgEIAAAAIAAAAIAAAAIAAgBIAAAAIgBgBIgCgDIgDgGYAAAAAAAAAAAAYAAAAAAAAAAAAYAAABABAAAAABYAAABAAABAAABIABAEYgBgDAAgEgBgCYgBgBAAgBgBgCIgBgDYgBgCgBgDgCgCIACADYgBgBAAgBgBgCYgBgBgBgBAAgCYgBgCgBgBAAgCYgBgBAAgCgBgCYgBgBAAgDgBgDIgBgIIAAAAIAAAAYAAgBAAADAAgBIAAAAIAAAAIAAgBIAAAAIAAgBIgBgBIAAgCYAAgBgBAAABgCIAAgIIABgDIAAgBIAAAAIAAAAIAAgBIAAAAYAAgBgCAJABgEIAAAAIABgDIADgOIAEgRIACgEIAAAAYABgDgDAGAAgBIAAAAIAAAAIAAAAIABAAIAAgBIABgCIADgIIABgDIAJgdIAEgOIAAgBIAAgBIAAAAIAAAAIABgCIAAgCIABgFYABgEAAgDABgEYAAgDAAgEAAgDYAAgCAAgCAAgBIAAgDIgBgGIgBgFIgCgJYgCgGgBgGgDgGYgBgDgBgDgCgDIgFgIIgEgEYACABABACABABYAAABAAAAAAAAIgBgBIAAAAIAAgBIAAAAIAAAAIABACIAAAAIAAAAIAAAAIgBAAIAAgBIAAgBIgBgCYgBgBAAgBgCgCYgBgBgBgCgBgBIACADIgLgPIABABIgIgLIAAAAIAAgCIAAAAIAAAAIAAgBIgBgBIgCgCYgBgBgBgBgBgCIgDgGIgBgBIAAAAIAAAAYAAAAAAgBAAABIAAAAIAAAAIAAAAIgBgBIgBgDIgGgMIgGgLYgBgEgCgEgCgDIgDgMIgDgNYgBgDgDgCgDABYgDAAgBACAAAD");
	this.shape.setTransform(-409.4,49.5,1,1,0,0,0,-1.3,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},1).wait(8).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-415.3,12.8,14.100000000000023,73.5);


(lib.Fire2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF6600").s().p("AiPoQIgBAVYABAJABAJABAJYACAIACAIACAJIAFAMIAEALIAIAUIACAFIABADIABABIAAAAYAAAAAEAGgCgDIAAABIABAAIAEAKIADAFYABABAAABACADIAJAMIAEAGIABACIABABIAAAAYAAAAgDgDACACIAAAAIABACIAGAJIAGAJIABABYgBAAABABAAAAIAAAAIABAAIAAABIACACIADAEIAMASIABACIABABIAAABIAAAAYgFgFAEADgBgBIAAABIADAEIADAFIABACYABABgBgBABABIAAAAIAAAAIAAABIABABIABACIABAAIAAABYACACgCgCABABIAAAAIABABIADAFYACACgCgBgBAAYAAAAgBAAgBAAYgCADgEgBgDABYAAAAAAABgBAAIAAAAIgBAAIAAAAIAAAAYABAJgCgVABACIAAABYgBADgBAEgBADIAAABYAAABAAABAAgBYgBgBAAgCAAgBYgBgCAAgCAAgCYAAgBAAgCABgBYAAgBAAgBAAAAYAAgBgBgCABgBYAAgBAAgBAAgBYAAgBAAgBAAgBYAAgBABgBAAgBYAAgBABgCgCACIgQAOIggAbIgIAHIgCACIgBABIAAAAYgCACAVgYgJAKIAAABIgBAAIgEADIgCABIAAAAIAAAAYgBAAABgBgBACIAAAAIgDACIgEADIgEADIgBAAIAAAAYgSAVANgPgEAFIgBAAIgBABIgCACIgPAOIgIAHYgBAAAAABgBABIgDADIgFAHYgHAIgHAJgHAKIgGAHIgBABIAAABIAAAAYgLAXAIgQgDAFIAAAAIgCADIgCAEIgBABIgBABYAAAAAAAAAAABYgBADgCADgBAEYgCAGgDAHgBAGYgBAEgBADgBADIgCAIYgBAKgCAKgBAKYAAAEAAAFAAAFIAAAHIAAADIAAACYgCgKAEAZAAgDIAAAAIAAABIAAAKIAAALYABAIADAJACAJYACAKADAJADAJYADAHADAIAEAHYADAIADAHAEAHYAFAHAEAHAFAHIAHAKIADAFIABABIABABIAAAAYACADgWgaAKALIAAABYABABAAABAAABYAAAAADAEgGgIYgJgLgIgOgEgNIAEALYACAGADAGADAGYABACACADABADYACADABACABACYADAEACAEADAEIAEAFIAEAFYACACACADADADIADAEIADADYAEAEAEAEAEADIgWgVYgCgBgBAAgBgBIgBgBIgBAAIAAgBIAAAAIAAAAIAAAAYgOgVAKAPgDgEIAAAAIAAABIADAKIAGAUYABACAAACABABIgBADIAAAFIgBAKIAHAPYgBgBgBAAgBAAIAIANYgCgBgCgBgBgBYgBgCgCgBgCgCYAAgBgBgBgBgBYAAgBAAgBgBgBYgBgCgCgCAAgDYAAgBAAgBgBgBYAAgBAAAAgBgBYAAgBAAgBAAgBIAAgBIAAgBIAAgLIAAAAIAAABIAAAAIAAACIAAAGIAAABYAAAAAAAAAAAAIAAgCYAAgDAAgCAAgDYABgFAAgFABgFYABgFACgFABgFIABgDIABgCIAAgBIAAAAIABAAYgCAEASgugIAUIAAAAIAAABIgBACYAAAAAAAAAAAAIACgEYABgDACgDABgCYAGgLAHgKAIgKIAQgPYgIAGgGAIgHAHYgGAJgGAIgGAJYgFAKgFAKgFAKYgEAKgEAKgDAKIgEAQYAEgRAHgPAJgQYADgEACgEADgDIACgDIABAAYACgFgbAsALgTIAAABIAAAAIAAABIgCAFIgBAFYgBABAAABAAABIAAABIgBACIgCAEYgEALgEALgEALIgBAFIAAACIAAAAIgBABYAAABAGgQgDAHIAAAAIAAADIgBAFIAAAGIgBACIAAACIAAAAIAAABIAAAAYABgCgCAEAAgBIAAABYAAACAAABAAACIAAADYAAAAgBADAAACIgCAGYgCAJgBAJgCAJIAAAGYgBACABABgBACIAAAJYAAAGAAAFABAGYAAAGABAFAAAFIADASIADAFIAKAUIACAFIACADIAAAAIAAAAYAAgEAHAtgDgTIAAAAIAAAAIABABIAEAFIAAABYABAAAAAAAAABIABACYABAEACADABADYADAHAEAHADAGIAAAAYgJgXAHARgCgGIAAABIAAAAIABAAIAAABIACACYADADADADADADYABgDABgDABgCYABgCABgBAAgBYABgBABAAABAAYACAAACAAACAAYACABACAAABABIAEABIABABIAAAAYAAgCAAAHABgKIAAAAIAAAAIAAABIABACIAGAMIABABIAAABIAAAAYAAABACgLgBAFIAAAAIAAAAIABADIADAGIABADIABABYAAAAAAAAABAAYABABABAAABAAYABAAABABABAAYACABABABABABYACACACACADABYABABABACABABIAAAAIAAAAIAAAAYADgGgHAPABgCIAAAAIABACIABADIABAHIABADIABABIAAAAIAAAAYAAAAAAABAAgBIAAAAIABABYACAFABAFACADYACACADACACADYACADACAEABAEYABAEABAEABAFIABAJYACAMALAJAMgBYAFAAAGgBAGgBYAGgBAGgCAFgCYAGgDAGgEAGgFYAEgCAEgCAFgCIABAAIABAAYAAgCAAABAAAAIAAAAIAAAAIABgBIADgBIAGgEIADgBIABgBIABAAYAAgCgGAPADgGIAAAAIAAgBIABgBIAIgGYAFgEAFgEAEgFIAHgHYACgDACgDACgDIAGgKIACgCIABgBIACgCIAEgFIACgCIABAAIAAgBYgBAFACgLAAABIAAAAIAAAAIABgBIAJgKIACgCIAAgBIAAAAIAAAAYABgKAAAHAAgCIAAgBIABgCYACgDABgDABgDYACgGACgHACgGYABgHACgHABgHYABgEAAgDABgEYAAgEAAgFAAgFYAAgJAAgKgBgJYAAgEABgEABgEIAAgDIAAgBIAAgBIAAAAIAAAAYgCgFAHARgJgYIAAAAYACADACADACAEYABABABACAAACIABABYAAABAAgBAAAAIAAgBIACgGIAAgBIAAgBIAAAAYgDgTAHAtAAgEIAAgBIAAAAIABgDIABgFIAGgWIACgFIAAgBIAAAAYABAJgBgGAAACIAAAAIABAAIAAACIABACYABACAAABABACYAAACABADAAACIAAAEYAAAAAAABAAABIAAAEYAAAFgBAGgBAFIgBAEYgBABAAADAAgCIACgCYABgBABgCABgBIAAAAYABgBgCAEABgCIAAAAIAAAAIAAAAIABgBIACgDIADgEIADgEIABgDIABAAYgDAHAGgQgBABIAAABIAAAAIAAABIAAACYgBAEgBAFgCAFIAAACIgBABYAAAAAAgBABAAYAAAAABgBAAgBIAEgEIADgEIABgBIAAAAIAAAAYAMgTgcAsADgFIABAAIACgEYAEgFAEgFADgGYAOgWAIgVAFgYIgEAQYgBAHgDAHgDAHYgCAHgEAGgEAHYgDAGgEAGgFAFYgEAFgEAFgFAFIAQgQYAJgLAIgMAHgMYACgDACgEABgDIADgFIABgBIABgCIAIgWIABAAIAAgBIABgDIABgFYACgHACgHABgHYACgHABgHABgHIABgLIAAgEIAAgGIAAgBIAAgBIABgLIAAgBIgBgIYAAgFAAgFgBgFIgCgOYAAgFgBgFgCgGYgCgKgDgKgCgKYgCgEgCgFgCgFYgCgFgCgFgCgFIgGgOYgDgEgCgFgDgEYgFgJgGgIgFgIIAHAOYgDgGgEgFgDgFIAHAOYgGgJgHgJgGgHIgKgNIgFgHYgCgBgBgBgBgCIgQgOIgHgIIgBAAIAAAAIgHgLIAAAAIAAAAIgBgBIAAAAIgBgCIgFgFIgKgKIgVgWYAAAAgBAAAAAAYAAAAAAABAAAAIAAAAYACACACACACACYAAABAAAAABABIACACYACACABACABABIAFAHYACADACADACADIACAFYACACABACABACYACAFACAEACAFIAEALYgGgQgJgRgKgOYgHgKABADgBgBYAAgBgBAAgBgBIgBgBYAJALgVgZACACIAAAAIAAAAIAAABIAAABYABAAAAABAAABYAAABAAABAAACYAAABABABAAACYAAABAAACgBABYABADAAACABADYAAADgBADAAACIgEgKIgEgKIAAAAIAAAAYAAgDAEAagCgLIAAAAIAAABIAAACYgBABAAACAAABYgBACAAAEgCADYAAABAAAAgBABYAAACgBACAAABYgBAEgBADgCADYgBACgBABgBACYAAAAAAAAAAAAIAAgBIABgBIABgFIAAgDIABAAYgDAFAIgRgLAXIAAAAIAAAAIAAgBIAAgCYABgCAAgDAAgDIAAgCIAAgBYAAAAABgBAAgBIAFgJIAKgTIABgCIAAgCIABAAYgEAFANgQgSAVIAAAAIAAAAIADgFIACgEIACgCIAAgBYgCACACgBgBAAIAAAAIABgBIAAgBIADgEIABgBIAAAAYgJAKAVgYgCACIAAAAIABgBIABgDIAEgJIATgmIAJgTYAAgBADgFACgEYACgDACgEACgEYACgEACgEACgEYABgFABgEACgEYABgFABgEABgFYABgCAAgCABgDIABgJYABgFAAgGAAgGIAAgIYAAgCAAAAAAAAIAAgBYgBgEgBgDgBgEIAAAAYAAACgBgVABAJIgBgBIAAgBIAAgCIgCgFYgBgDgBgEgBgDYgJgagPgagUgSYgDgDgDgDgDgDYgDgCgEgEAAAAIgFgCIgBgBIgBAAYABAAgCgBACACIAAAAIAAgBIgDgBIgBgBIAAAAIgBAAIAAAAYABAAgBgBABABIgDgBIgEgDIgFgDIAAAAYgBgBAEADgGgFIAAAAIAAAAIgBgBIgDgBIgSgKIgFgDIgCgBIgBAAIAAgBIAAAAYgBAAACABgBAAIgBgBIgKgFIgIgFIgCgBIgBAAYACABgEgDABAAIAAAAIgBAAIAAAAIgDgBIgHgCYAAAAgCgCgCAAIgEgDIgJgHIAAAAIAAAAYgDgDAFAGAAAAIgBAAIgBgBIgCgCIgEgDIgQgOYgDgCgCgCgDgBIgGgFYgFgEgEgEgEgEYgEgEgDgEgEgFIgLgTIAAAAYgFgKgMgDgKAFYgHAEgDAGgBAH");
	this.shape.setTransform(-409.1,32.45,1,1,0,0,0,-4.1,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},1).wait(8).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-429.9,-22.3,48.19999999999999,109.6);


(lib.Fire1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("Ai3qtYgBAJAAAKAAAKYABALAAAMADALIADARYACAFABAGACAFIAGAQYACADAAADACADIADAHIALAaIADAGIAAACIAAAAYABABgDgEAFAGIAAABIAAAAIACAEIAGAMIAEAHYABACACADACADIAMAQIAPAYIAEAFIABACIABABIAAAAYAAAAACACgBgBIAAAAIACADIAIAMIAJALIAEAGIACADIABABIAAABYgEgEADADgBgBIABABIAAAAIAEAGIAAAAIAAAAIgCAAYAAAAgBgBgBAAIgBgBIAAAAYACADgIgKAMAOIAAAAIAAAAIACADIABACIAAABIAAAAIAAAAYgBgBALALgEgFIACADIAEAGYABABgBAAgBAAYAAAAgBAAAAAAYgBAAgBgBAAABIgCABYgDACgFAAgDADIgBAAIAAAAIAAAAIAAAAYAAgFABAQgCgWIAAADIgCAHIAAAEIgBABIAAABYAAABAAgBAAAAYgBgDgBgDAAgDYAAgDAAgDAAgCYAAgBABgBAAAAIgBgBYAAgBAAgBAAAAYAAgCAAgBAAgCYAAAAABgBAAgBIAAgBYAAgCAAgBAAgBYAAgBAAAAAAgBIABAAIAAgBYAAAAADgEgCACIAAAAIAAABIgLAJIgVASIgrAlIgCACIgCABYAMgOgJALADgEIAAABIgBAAIAAAAIgDACYADgEADgEAEgDYACgCACgCACgCIABAAYAJgJgWATACgCIAAABIgBAAIgDACIgDACYgCACgDADgDACIgIAIIgEAEYgBABgCACAAAAIgFAEIgLAKIgDACIgDAEIgHAHIgPAQYgIAKgJAKgIAKIgMAQIgDAEIgBACIAAABYgDAGAJgUgNAcIgBABIAAAAIgEAGIgCADIgBACIAAAAIgBADYgEAJgDAIgDAJYgBAEgBAEgCAFIgBAGYgBACgBADAAABYgBAGgBAHgBAGYgBAGgBAHgBAGYgBAGAAAGAAAGYAAAGAAAGAAAGIAAACIAAACYAAAEgCgOADAUIAAAAIAAACIAAADYgCACAFAkAEAQYAIAmAQApAYAkYAFAKAGAIAHAJIAFAGIABABYgHgIAXAcgggmIAAAAIAAAAIABACIACADYAAABAAABAAAAYgCgDgCgDgCgDYgFgFgDgGgEgGYgCgDgBgDgCgDIgCgFYAPAhgLgYAEAIIAAAAIAAAAIABAEYAFAKAGAKAGAKIAFAHIAFAHIAFAGYAEAEADAEAEAFYAGAGAFAGAGAGIgNgMYgFgEgFgFgFgFYgCgDgCgCgDgDIAAAAYABABgKgRAEAIIAAAAIAAAAIAAAAIAAAAIABABIAAACIAFAPIAIAcYAAACAAABAAACIAAAEIgBAHIAAAIIAAABIAAAAIAAAAIAAAAIAAAAIAAAAYgDgFAHANgBgBIAAAAYAAABAAABABACIACAHIAJARYgCgBgCgBgBgBYgBgBgBgBgBgBYAAgBgBAAgBgBYgCgCgCgCAAgCYgBgCgBAAAAgCYgBgBgBgBAAgBYgBgBAAgBAAgBYAAgBgBgBAAgBYgBgCAAgCAAgBIAAgCIAAAAIAAAAIAAAAYABglgBAbAAgJIAAAAIAAABIAAABIAAABIAAAIIAAABIAAABIAAgCIAAgEYAAgGABgGABgGYACgMADgMAEgLIgGAWYAFgUAIgUAKgSIAEgHIADgGYACgCACgDABgCYAEgFAEgFAEgFYAEgFAEgFAEgEIACgCIABAAYACgCgPAPAGgHIAAABIgBABIgCACIgBACIgEAFIgFAGYgHAIgGAIgFAJIgEAGYgCACgBADgBABIgGAKYgDAHgDAHgEAHYgGAPgEAOgEAPIgBABYADgJgJAeANgpIAAAAIAAABIgBABIAAACIgBADIAAACIAAAAIAAgBIABgCIACgFYADgGADgGADgGYAEgGADgGAEgGIABAAYgVAiAPgZgFAIIAAAAIAAABIAAABIgBABIgFAPIAAABIgCAGIgFALYgCAHgDAIgDAIIgDALIgCAGIAAABIAAABYgBACAIgWgEAKIAAAAIAAABIgBAHIgCAPYgBADAEgJgFANIAAAAIAAAAIAAAAIAAABIAAACIgBAEIAAAEIgEAQYgCAMgCAMgBAMIgBAEIAAADIAAAGIAAAMYAAARACAOACAOIABAFIAAADIAAABYAAgBACAOgBgGIAAAAIAAAAIACAEIADAHIAPAcIACADIAAABIAAAAIABABYAFAlgEgbACAIIAAABIABABIAEAHIABABIAAAAYAAAAABAAAAABIADAIYACAFACAFACAFYACAFACAFADAFIADAHYgCgGAIAUgKgbIAAAAIAAAAIAAABIABABYADADAEAEAEAEIADADYABAAAAgCAAAAYABgCAAgCABgCYAEgJAFADAGABYADAAACABADACYABAAABABACABIABAAYgBAFACgNgBACIAAAAIABAAIAAAAIABACIACAEIAEAIIACAEIABACIAAABIAAABIAAAAYgBAHADgSAAACIAAAAIAHARYAAABABAAABAAIACABYABABACAAABABYADACADADADAEYADADADACACAEIABAAIAAAAYACgFgGANABgBIAAAAIAAABIABACIABAFIACAJYACAGACAGADAGIAAADIABABIAAAAYABABABAAABABYABABACACACACYACADADAGACAFYACAGABAFABAHIABAMYACAPANALAPgBYAIAAAIgBAJgCYAEgBAEgBAEgBYAEgBAEgCADgCYAEgDAEgCAFgDIAGgFIABgBIABgBIADgBIARgIIAIgEIAEgDIACgBIABAAIABAAYAAgCgGANADgFIAAAAIABgBYAGgFAIgGAGgGYAGgGAHgGAGgIYACgEADgEADgEIAEgGYABgCACgDABAAIAMgNIAAAAYAAACADgSgCAHIAAAAIABAAIAAgBIACgCIADgDIAFgHIADgDIACgCIAAAAIAAAAIAAAAYAAABABgNAAAFIABgBYACgFABgEACgEYACgJADgIADgJYADgUAFgQgBgcYAAgHgBgGAAgHIgBgJIABgEYABgGABgFAAgFIAAgBIAAgBIAAAAIAAAAYgKgbAHAUgCgGIADAEYABACACADABACYABADACADABADIABAEYABABAAAAAAgBIAAAAIAAgBIACgIIAAgCIAAAAYABAIgEgbAGAlIAAAAIAAAAIABgBIABgEIAIgeIACgIIABgEIAAAAIAAAAYgBgGABAOAAgBIABAAIAAABIABACYACAEABAEABAHYAAACAAACABABIAAADIAAABIAAACYAAAHgBAIgCAHIgBAFIgBACIAAACYAAAAAAAAAAAAIACgDIADgDIABgCIAAgBIABAAIAAAAIAAAAYgFAMADgJgBADIAJgMIAFgHIAAAAIAAAAYgDAJAIgWgBACIAAABIAAAAIAAACYgBACAAACAAABYgBADAAADgBADYgBACAAABgBACIgBACIACgCIAJgLIABgCIABAAIAAgBIAAAAYgEAIAPgZgVAiIAAgBYAGgHAFgIAEgIYAFgIAEgJAEgIIAFgLIABgCIABgDIABgCIABAAIAAgBIAAAAYANgpgKAeADgJIAAAAYgCALgEAKgEAJYgCAFgCAFgCAFYgCACgBADgBACIgDAEIgDAFYgEAHgFAGgFAGIgDAFIgEADIACgBIACgCIABgBIAAAAYAHgHgPAPACgCIABgBIACgCYAFgFAFgFAFgGYAEgGAFgGAEgGIAHgJIABgDIACgDIAFgIYALgUAJgXAGgWIgHAWYAGgQAEgQADgRYACgIABgIABgJIABgJIAAgCIAAgHIAAgCIAAgBIAAAAIABgTIAAAAIgBgBIAAgJYgBgLgBgMgCgLYAAgGgBgGgBgGYgCgGgBgFgBgGIgFgSYgCgFgBgGgDgGYgEgLgEgLgGgLYgCgGgDgFgDgGIgIgPYgHgKgGgKgHgJIAKARIgFgGYAAgBgBgBgBAAIAAgBYgBgBAHANgDgFIAAAAIAAAAIAAgBIgBAAIgBgBIgBgDIgOgSIgOgSIgHgJYgCgDgCgDgDgCIgVgVIgLgLIgBgBIgBgBIAAAAIAAAAIgBgBIAAAAIgFgIIAAAAYgEgFgDgEgEgFYgIgJgIgIgJgIIgMgMIAAAAIAAAAYADADABADADADYACADACACACADIACADIAEAFIAEAGYAFAIAFAJAEAIIgCgDIgBAAIAAAAYADAHgKgYAOAhIgCgGYgCgEgDgEgCgEYgEgJgFgIgFgHYgDgEgDgEgCgDYgBgCAAABgBgBIgDgCIgBgBIAAgBIAAAAYghgmAYAcgIgJIABABIAAABYAAABAAACABACYABAHgBAHgCAEIgBAAYAAABAAAAAAAAIAAABYAAABAAABAAACIAAACYgBAAAAABAAAAIAAgCIgCgHIgCgDIAAgCIAAAAYACAUgBgOAAAEIAAAAIAAABYAAABAAACgBABYAAACgBABAAABYAAACgBACAAACYgBACgBABgBACYAAAAAAACAAABIgBADYgBACgBACAAACYgCAEgCAEgCAEIgBABIAAAAIAAgCIABgDIACgHIAAgBIAAAAYgOAcAKgUgDAGIAAAAIAAgBIABgCIACgIYABgFACgGACgFIACgHIABgDYAAgBAAAAAAgBIACgDIAHgMIADgGYABgBgBABgBAAIgCACYgBABgBABgBAAYgBABgCABgBABIACgDIACgDIABgBIAAAAYACgCgWATAKgJIABgBYADgCADgDADgCYAFgGAFgFAFgGIACgDIAAgBIAAAAIABAAYACgDgIAKALgOIABgCIACgDIAYgzIANgZIAGgMIAAgBIAAAAYgBACADgEAAAAIABgCIACgEIAEgHYADgFACgGADgFIADgHIADgJYACgFABgGACgGIACgIIABgFYAAgBABgCAAgCYABgHABgIABgHYAAgHAAgIAAgHYAAgBAAgBAAAAIAAgBIAAgCIgBgDIgCgHIgBgEYgBgWABAQAAgFIgBAAIAAgBIAAgCIgBgDYgJgigRgkgZgbIgJgKYgDgDgFgEgDgEIgGgFYgCgBgDgDgBAAIgGgDIgDgCYgEgFAKALgBgBIAAAAIAAgBIgBAAIgBgBIgDgCIgBAAIAAAAYAMANgJgKADADIgCgCIgDgDIgHgGIgDgDIgCgCIgBAAIgGgEIAAAAIgBAAYAAgBACADgEgEIAAAAIgCgBIgDgCIgGgDIgNgHIgMgHIgDgCIAAAAYgBgBACACAAAAIgBAAIgBgBIgBgBIgGgDIgYgNIgIgDYgCgBgBAAgCgBIgGgEIgLgIIgDgCIgBgBIAAAAYAFAGgEgFABACIAAAAIgBgBIgGgFIgWgSIgGgEYgBgBgBgBgCgBIgJgHYgDgCgCgDgDgCIgIgJYgGgFgEgGgFgGYgEgIgFgIgEgJIAAAAYgHgMgPgFgNAHYgIAEgFAIAAAJ");
	this.shape.setTransform(-408.95,16.6,1,1,0,0,0,-5.2,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("AixquYAAAKgBAJAAAKYABALACAMACALIAEAQYABAFACAGACAFIAGAQYABACABADACADIADAGIALAaIADAGIABACIAAAAYABACgDgEAEAFIABABIAAAAIACADIAGANIAEAGIAFAIIALAPIAQAYIAFAFIABACIAAAAIAAABYAAAAACABgBAAIABAAIACADIAIALIAIALIAFAGIACADIABABIAAABYgDgDACACAAgBIAAABIAAAAIAEAGIABAAYgBAAAAAAAAAAIgBAAYgBAAAAAAgBgBIAAAAIgBAAYACACgHgJAKANIABAAIAAAAIACADIAAACIABABIAAAAIAAAAYgBgBAKAKgEgEIACADIAEAGYABABgBgBAAABYAAAAgBAAAAAAYAAAAgBgBAAABIgBACYgCAEgEABgDAEIAAAAIAAABIAAAAIAAAAYAAgFAAAPgBgUIAAADIgCAHIAAAEIgBABIAAABYAAABAAgBAAAAYgBgCAAgDgBgCYAAgCAAgDAAgCYABgBAAgBgBAAYAAgBAAAAAAgBYAAgBAAgBAAgBYAAgBAAAAAAgBIAAgBYAAgBAAgBAAAAYAAgBAAAAAAgBIAAAAIAAgBYAAABADgEgBACIgBAAIAAAAIgKAKIgVASIgqAmIgCACIgCABYALgMgIAJACgDIAAAAIAAAAIgBABIgDACYADgDADgEADgDYACgCACgBABgCIABgBYAJgHgUARACgCIAAABIgBAAIgDACIgDACYgCACgDACgDADIgHAHIgEAEYgBABgCACAAAAIgFAEIgKAJIgDADIgDADIgHAIIgOAPYgIAKgIAJgIAKIgLAQIgDAEIgCACIAAABYgDAFAJgSgMAaIAAAAIgBABIgDAGIgCACIgBACIgBABIgBADYgDAHgDAIgCAIYgDAIgCAIgCAHYgBAGgBAGgBAGYgBAGgBAGgBAGYAAAGAAAFgBAGYAAAGAAAFAAAGIAAACIAAABYABAEgCgNACASIAAAAIAAACIAAAEYgBACAEAhAEAPYAIAlAQAmAWAiYAFAJAGAIAGAIIAFAGIABABYgHgHAVAYgcgiIAAABIAAAAIABACIABADYAAAAABABAAAAYgCgCgCgDgCgCYgEgFgDgFgDgGYgCgCgBgDgCgDIgBgEYANAegKgVADAGIAAAAIABABIAAADYAFAJAFAKAGAJIAFAGIAEAGIAFAGYADAEADAEAEADYAFAHAFAFAFAFIgLgKYgEgEgFgEgEgEYgCgDgCgCgCgCIAAAAYABABgJgPAEAGIAAAAIAAAAIAAABIAAAAIAAABIABACIAFAOIAJAcYAAACAAABAAACIAAAEIAAAIIABAIIAAABIAAABIAAAAIAAAAIAAAAIAAAAYgDgFAGAMgBgBIABAAYAAABAAACAAABIADAHIAIAQYgBgBgCAAgBgBYgBgBAAAAgBgBYAAAAgBgBgBgBYgCgBgBgBAAgCYgBgBAAAAgBgBYAAAAgBgBAAgBYgBgBAAAAAAgBYAAgBAAAAgBgBYAAgBgBgBAAgBIABgBIAAAAIAAAAIAAAAYAAgiAAAYAAgHIAAAAIAAAAIAAABIAAACIgBAHIAAACIAAAAIAAgBIAAgEYABgFAAgGABgFYACgKADgKADgKIgGAUYAFgSAHgSAJgRIAEgGIADgEYABgDACgCABgCYADgFAEgEADgFYAEgEAEgEAEgEIABgBIABgBYABgCgNAOAGgGIgBABIAAAAIgCADIgCACIgEAEIgEAGYgGAHgFAHgFAIIgEAGYgBACgCACAAACIgFAJYgEAGgDAHgDAGYgFANgEAOgEANIAAABYACgIgIAbALglIAAAAIAAABIAAABIAAABIgBAEIgBACIAAAAIABgBIAAgCIACgEYACgGADgFADgFYADgGADgFAEgEIAAgBYgSAfANgWgEAHIAAAAIAAAAIgBABIAAACIgFAOIgBACIgCAFIgEAKYgCAHgDAHgCAHIgEALIgBAFIAAABIgBABYAAACAHgUgDAJIAAAAIAAABIgCAHIgCAPYgBADADgJgEAMIAAAAIAAAAIAAABIAAABIgBABIAAAEIAAAEIgEAPYgCALgCALgBALIAAADIAAADIgBAGIAAALYAAAQACANACANIAAAFIABACIAAACYAAgCABANAAgFIAAAAIAAAAIACAEIADAHIANAcIACADIAAABIAAAAIAAABYAGAhgEgYABAHIAAABIABABIAFAHYAAABAAgBABACIADAHYABAFACAFACAEYACAFACAEADAFIADAHYgCgGAHASgJgYIAAAAIAAAAIAAABIABAAYADAEADAEAEAEIADADYABAAAAgBAAgBYABgBAAgBABgCYAEgHAFAEAFABYACABACACADABYABABABABACABIAAAAYAAAFABgMAAACIAAAAIAAAAIAAAAIABACIACAEIADAIIACAEIABACIAAABIAAAAIAAABYgBAHADgRAAACIAAAAIAGAQYAAACABgBAAABIACABYABABACABABABYACACADADACAEYADADACADACADIABABIAAAAYACgFgGAMABgCIAAABIAAABIABACIABAEIABAJYACAGACAGABAGYABAEABAAACACYABABABACACACYACADACAGABAFYACAFAAAGABAGIAAAKYABAOAMAKAOAAYAAAAABAAAAAAYAHgBAIgBAIgCYAEgBAEgBAEgCYAEgBADgCADgCYAEgDAEgCADgDYAEgDAEgDADgBIAQgJIAIgFIAEgCIABgBIABgBIABAAYAAgBgFALACgEIAAgBIABAAYAGgFAHgGAGgGYAGgGAGgGAFgHIAIgLIADgGYABgCACgDABAAIALgNIAAAAYAAABACgQgBAHIAAAAIABgBIAAgBIACgBIACgEIAFgGIADgEIABgBIABgBIAAAAIAAAAYAAABABgMgBAFIABgBYACgEABgEABgEYADgJADgIACgJYADgSAEgPgBgbYAAgGgBgGAAgGIgBgJIABgEYABgFAAgFAAgGIAAgBIAAAAIAAAAIAAgBYgJgYAHASgCgFIACADYABACACACABADYABACABACABADIABADYABABAAgCAAAAIABgIIAAgCIABAAYABAIgEgZAFAiIAAAAIAAgBIABgBIABgDIAGgfIACgHIABgEIAAAAIAAAAYgBgGACANAAgBIAAAAIAAABIABABYABAEACADABAGYAAABAAABAAACIAAACIAAABIAAACYAAAGAAAGgCAGIgBAFIAAACIgBABYAAAAAAAAAAAAIADgDIACgDIABgCIAAgBIABAAIAAAAIAAAAYgFALAEgIgBACIAIgMIAEgGIABgBIAAAAYgDAIAHgUgBADIAAAAIAAAAIAAACYAAABAAACAAABYgBACAAADgBACYAAACgBABAAABIgBACIABgCIAKgLIABgCIAAAAIABgBIAAAAYgEAHANgWgTAeIABAAYAFgHAEgIAEgHYAEgHAEgIAEgIIAEgKIABgBIACgEIABgBIAAgBIAAAAIAAgBYAMgkgIAaACgIIAAABYgCAJgDAJgEAIYgBAEgCAFgCAEYgBACgCACgBACIgCAEIgDAEYgDAGgFAGgEAFIgDAEIgDADIABgBIADgDIAAAAIABgBYAFgGgNAOACgCIABgBIACgBYAEgFAFgFAEgFYAEgGAFgFADgGIAGgIIACgCIACgDIAEgHYAKgTAIgUAFgUIgGATYAFgOAEgPADgPYABgIACgHAAgIIABgIIAAgCIABgHIAAgCIAAgBIAAAAIAAgRIAAAAIAAgBIgBgJYAAgKgBgLgCgLYAAgFgBgGgBgFYgCgGgBgFgBgGIgFgQYgBgGgCgFgCgFYgEgLgEgKgFgLYgCgFgDgFgCgFIgJgOYgFgKgGgJgHgJIAJAQIgEgGYgBgBgBgBgBgBIAAAAYAAgCAFAMgCgFIAAAAIAAAAIAAAAIgBgBIAAgBIgCgCIgNgSIgNgSIgHgIYgCgCgCgEgCgCIgVgVIgLgLIgBgCIAAAAIgBgBIAAAAIAAAAIAAAAIgFgHIAAAAYgDgFgEgEgDgEYgHgIgIgIgIgIIgKgKIgBAAIAAAAYACADACACACADYACACABACACACIACADIAEAFIADAFYAFAHAEAIADAHIgCgDIAAAAIAAAAYACAGgJgVANAdIgDgFYgBgEgCgEgCgEYgEgHgFgHgEgHYgDgEgCgDgDgDYgBgCAAABAAgBIgDgCIgBgBIgBgBIAAAAYgdgiAVAZgGgIIAAAAIAAABYAAABAAABAAACYAAAEgCAFgCACYgBAAAAgBAAACYAAABAAABgBABIAAABYAAAAAAABAAAAIgBgCIgCgHIgBgDIAAgCIgBAAYADASgCgNABAEIAAAAIAAABYgBABAAABAAABYgBABAAABgBABYAAABAAACgBABYAAABgBACAAABYgBADgBAEgCADYgBAEgCADgCADIgBABIABAAIAAgCIABgDIACgHIAAgBIAAAAYgMAZAIgSgCAGIAAgBIAAgBIABgCIACgIYACgFACgGACgGIADgHIABgDYAAgBAAAAABgBIABgDIAHgMIAEgGYAAgBAAAAgBABIgBABYgBABgBABgBAAYgBABgCABAAAAIACgDIACgDIAAAAIABgBYACgCgUARAJgHIABgBYACgCADgDACgCYAFgFAFgFAFgFIABgDIABgBIAAAAIAAAAYACgDgHAJAKgNIABgBIACgDIAZgyIANgZIAHgNIAAAAIAAAAYgBABADgDgBAAIABgCIACgDIAEgIYADgEACgFACgFIAEgHIACgIYACgFACgGABgFIACgIYABgDAAgCABgEYABgHABgHAAgGYABgHAAgHAAgHYAAgBAAgBAAAAIAAgBIgBgCIAAgDIgCgHIgBgDYgBgUABAOAAgFIAAAAIAAgBIgBgBIgBgDYgIghgQgigXgaIgJgJYgDgDgEgEgEgDIgFgFYgCgCgDgCAAAAIgGgEIgDgBYgEgFAJAKgBgBIAAAAIAAAAIgBgBIgBgBIgDgCIgBAAIAAAAYALAMgIgJACADIgBgCIgDgDIgHgGIgDgDIgBgBIgBgBIgGgDIAAgBIgBAAYgBgBADADgEgEIAAAAIgCgBIgDgCIgGgDIgMgHIgMgHIgDgCIAAAAYgBgBACACgBAAIAAgBIgBAAIgBgBIgGgEIgYgOIgIgDYgCgBgBAAgCgBIgFgEIgMgJIgDgCIAAAAIgBgBYAFAGgDgEAAABIAAAAIgBgBIgFgFIgWgSIgFgFYgBAAgCgCgBgBIgJgHYgDgCgDgDgCgDIgJgJYgFgGgEgFgFgHYgEgIgEgJgEgIIAAAAYgGgLgOgFgLAGYgHAEgFAHAAAI");
	this.shape_1.setTransform(-409,16.6,1,1,0,0,0,-4.9,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[]},1).to({state:[{t:this.shape_1}]},8).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-434,-54.3,59.60000000000002,142);


(lib.Finishline = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AbyiHIkCh4ImyAAIC4B4IC7B6IDICBIKXAAIkXiBgAw0j/IF6AAIFiAAIFaAAIFPAAIFxAAIB4B4IB6B6ICCCBICLCMIKPAAA7viHIECh4IG5AAIi3B4Ii7B6IH8AAIiBCBIiLCMIJiAAAGKiHIA6B6IA+CBIBDCMIJ8AAAGKiHIGwAAIG8AAIH8AAAACiHIAAB6IAACBIAACMIJDAAAmTiHIg8B6IhACBIhFCMIJWAAAoPB0IIRAAIIAAAII0AAIJDAAIDXCMILtAAIktiMAmTiHIGVAAIGIAAAnPgNIHRAAIHCAAIHwAAIH9AAIJIAAAsxiHIh5B6IHbAAAzriHIG6AAIGeAAA5sB0IjXCMIKNAAA/3gNIEIh6IIEAAA/3gNIJRAAIjGCBIJBAAIIcAAA9DEAIr5AAIEtiMIEYiBEgkPAB0IKjAAAACj/IAAB4AlYj/Ig7B4AFRj/IA5B4Aq6j/Ih3B4ALCj/IF8AA");
	this.shape.setTransform(-93.025,21.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Aa5EAIjXiMIKXAAIEtCMgAGuEAIhDiMIn+AAIAAiBInTAAIA8h6ImdAAIh6B6IHbAAIhACBIITAAIAACMIpYAAIBFiMIocAAICBiBIn7AAIC7h6IoFAAIEDh4IG5AAIi3B4IG6AAIB3h4IFhAAIg7B4IGXAAIAAB6IHBAAIA9CBII0AAICLCMgA/ZEAIDWiMIqiAAIEYiBIJRAAIjHCBIJBAAIiLCMgAOfB0IiCiBIH+AAIDHCBgAUbgNIi8h6IH9AAIEGB6gAEugNIg6h6IGvAAIh3h4IF7AAIC4B4Im8AAIB6B6gAiTiHIAAh4IFOAAIA5B4g");
	this.shape_1.setTransform(-77.9625,21.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AVXEAIiLiMIJDAAIDXCMgACZEAIAAiMIoSAAIhFCMIphAAICKiMIIcAAIBAiBIHSAAIAACBIH/AAIBDCMgEgmlAEAIEtiMIKiAAIjWCMgAcPB0IjHiBIn+AAICCCBIo0AAIg9iBIHvAAIh5h6IG7AAIC8B6IJHAAIEYCBgA3WB0IDHiBIpRAAIEIh6IIEAAIi7B6IH8AAIiCCBgA3WB0gACZgNIAAh6ImWAAIA8h4IFaAAIAAB4IGIAAIA6B6gAsTgNIB5h6IGdAAIg8B6gAWMiHIi4h4IGzAAIECB4gAIhiHIg5h4IFxAAIB4B4gAxUiHIC3h4IF6AAIh3B4g");
	this.shape_2.setTransform(-108.075,21.4375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-356.1,-5.2,526.2,53.300000000000004);


(lib.BlackRectangle = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,1,1).p("Eg4jglLMBxHAAAMAAABKXMhxHAAAg");
	this.shape.setTransform(2.025,11.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Eg4jAlMMAAAhKXMBxHAAAMAAABKXg");
	this.shape_1.setTransform(2.025,11.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-360.9,-227.9,725.9,477.9);


(lib.Rider = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.instance = new lib.RiderHead();
	this.instance.setTransform(17.75,-20.15,1,1,0,0,0,-16.9,2.8);

	this.instance_1 = new lib.RiderBody();
	this.instance_1.setTransform(10.7,95.85,1,1,0,0,0,0.4,0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-34,-66.5,97,241.1);


(lib.Coach = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.instance = new lib.CoachHead();
	this.instance.setTransform(213,-107.7,1,1,0,0,0,32.5,-51.4);

	this.instance_1 = new lib.CoachBody();
	this.instance_1.setTransform(180.45,22.4,1,1,0,0,0,0.4,0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Coach, new cjs.Rectangle(133.6,-164.5,158.79999999999998,265.7), null);


(lib._2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.instance = new lib.Fire3("synched",9);
	this.instance.setTransform(14.3,-8.6,0.1887,0.07,0,0,0,-409.2,50);

	this.instance_1 = new lib.Fire3("synched",9);
	this.instance_1.setTransform(9.35,-11.9,0.1887,0.07,0,0,0,-409.2,50);

	this.instance_2 = new lib.Fire3("synched",9);
	this.instance_2.setTransform(-3.85,-15.15,0.1887,0.07,0,0,0,-409.2,50);

	this.instance_3 = new lib.Fire3("synched",9);
	this.instance_3.setTransform(-11.8,-9.85,0.1887,0.07,0,0,0,-409.2,50);

	this.instance_4 = new lib.Fire3("synched",9);
	this.instance_4.setTransform(-14.6,6.5,0.1887,0.07,0,0,0,-409.2,50);

	this.instance_5 = new lib.Fire3("synched",9);
	this.instance_5.setTransform(-12.25,11.85,0.1887,0.07,0,0,0,-409.2,50);

	this.instance_6 = new lib.Fire3("synched",9);
	this.instance_6.setTransform(16.1,7.25,0.1887,0.07,0,0,0,-409.2,50);

	this.instance_7 = new lib.Fire3("synched",9);
	this.instance_7.setTransform(11.1,13.55,0.1887,0.07,0,0,0,-409.2,50);

	this.instance_8 = new lib.Fire2("synched",9);
	this.instance_8.setTransform(9,-12.25,0.08,0.08,0,0,0,-408.8,33.1);

	this.instance_9 = new lib.Fire2("synched",9);
	this.instance_9.setTransform(-2.65,-15.35,0.08,0.08,0,0,0,-408.8,33.1);

	this.instance_10 = new lib.Fire2("synched",9);
	this.instance_10.setTransform(-12.15,-10.8,0.08,0.08,0,0,0,-408.8,33.1);

	this.instance_11 = new lib.Fire2("synched",9);
	this.instance_11.setTransform(16.15,2.8,0.08,0.08,0,0,0,-408.8,33.1);

	this.instance_12 = new lib.Fire2("synched",9);
	this.instance_12.setTransform(12.75,10.9,0.08,0.08,0,0,0,-408.8,33.1);

	this.instance_13 = new lib.Fire2("synched",9);
	this.instance_13.setTransform(-15.25,-2.3,0.08,0.08,0,0,0,-408.8,33.1);

	this.instance_14 = new lib.Fire2("synched",9);
	this.instance_14.setTransform(-9.95,12.45,0.08,0.08,0,0,0,-408.8,33.1);

	this.instance_15 = new lib.Fire2("synched",9);
	this.instance_15.setTransform(-14.5,6.2,0.08,0.08,0,0,0,-408.8,33.1);

	this.instance_16 = new lib.Fire1("synched",9);
	this.instance_16.setTransform(14.5,-8.6,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_17 = new lib.Fire1("synched",9);
	this.instance_17.setTransform(11.3,-12.05,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_18 = new lib.Fire1("synched",9);
	this.instance_18.setTransform(8.2,-14.8,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_19 = new lib.Fire1("synched",9);
	this.instance_19.setTransform(3.35,-16.8,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_20 = new lib.Fire1("synched",9);
	this.instance_20.setTransform(-0.7,-16.8,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_21 = new lib.Fire1("synched",9);
	this.instance_21.setTransform(-4.1,-16.8,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_22 = new lib.Fire1("synched",9);
	this.instance_22.setTransform(-11.4,-12.85,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_23 = new lib.Fire1("synched",9);
	this.instance_23.setTransform(-15.15,-2.4,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_24 = new lib.Fire1("synched",9);
	this.instance_24.setTransform(16.05,-0.85,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_25 = new lib.Fire1("synched",9);
	this.instance_25.setTransform(0.85,16.9,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_26 = new lib.Fire1("synched",9);
	this.instance_26.setTransform(-5.65,15.25,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_27 = new lib.Fire1("synched",9);
	this.instance_27.setTransform(14.5,7.25,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_28 = new lib.Fire1("synched",9);
	this.instance_28.setTransform(9.75,11.85,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_29 = new lib.Fire1("synched",9);
	this.instance_29.setTransform(-8.25,-14.8,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_30 = new lib.Fire1("synched",9);
	this.instance_30.setTransform(-13.8,-8.6,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_31 = new lib.Fire1("synched",9);
	this.instance_31.setTransform(-15.95,2.85,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_32 = new lib.Fire1("synched",9);
	this.instance_32.setTransform(-12.25,9.55,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_33 = new lib.Ring("synched",0);
	this.instance_33.setTransform(0.35,2.9,0.15,0.15,0,0,0,4.7,3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_33},{t:this.instance_32},{t:this.instance_31},{t:this.instance_30},{t:this.instance_29},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17.5,-21.8,35.8,43.6);


(lib._1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.instance = new lib.Fire3("synched",0);
	this.instance.setTransform(14.3,-8.6,0.1887,0.07,0,0,0,-409.2,50);

	this.instance_1 = new lib.Fire3("synched",0);
	this.instance_1.setTransform(9.35,-11.9,0.1887,0.07,0,0,0,-409.2,50);

	this.instance_2 = new lib.Fire3("synched",0);
	this.instance_2.setTransform(-3.85,-15.15,0.1887,0.07,0,0,0,-409.2,50);

	this.instance_3 = new lib.Fire3("synched",0);
	this.instance_3.setTransform(-11.8,-9.85,0.1887,0.07,0,0,0,-409.2,50);

	this.instance_4 = new lib.Fire3("synched",0);
	this.instance_4.setTransform(-14.6,6.5,0.1887,0.07,0,0,0,-409.2,50);

	this.instance_5 = new lib.Fire3("synched",0);
	this.instance_5.setTransform(-12.25,11.85,0.1887,0.07,0,0,0,-409.2,50);

	this.instance_6 = new lib.Fire3("synched",0);
	this.instance_6.setTransform(16.1,7.25,0.1887,0.07,0,0,0,-409.2,50);

	this.instance_7 = new lib.Fire3("synched",0);
	this.instance_7.setTransform(11.1,13.55,0.1887,0.07,0,0,0,-409.2,50);

	this.instance_8 = new lib.Fire2("synched",0);
	this.instance_8.setTransform(9,-12.25,0.08,0.08,0,0,0,-408.8,33.1);

	this.instance_9 = new lib.Fire2("synched",0);
	this.instance_9.setTransform(-2.65,-15.35,0.08,0.08,0,0,0,-408.8,33.1);

	this.instance_10 = new lib.Fire2("synched",0);
	this.instance_10.setTransform(-12.15,-10.8,0.08,0.08,0,0,0,-408.8,33.1);

	this.instance_11 = new lib.Fire2("synched",0);
	this.instance_11.setTransform(16.15,2.8,0.08,0.08,0,0,0,-408.8,33.1);

	this.instance_12 = new lib.Fire2("synched",0);
	this.instance_12.setTransform(12.75,10.9,0.08,0.08,0,0,0,-408.8,33.1);

	this.instance_13 = new lib.Fire2("synched",0);
	this.instance_13.setTransform(-15.25,-2.3,0.08,0.08,0,0,0,-408.8,33.1);

	this.instance_14 = new lib.Fire2("synched",0);
	this.instance_14.setTransform(-9.95,12.45,0.08,0.08,0,0,0,-408.8,33.1);

	this.instance_15 = new lib.Fire2("synched",0);
	this.instance_15.setTransform(-14.5,6.2,0.08,0.08,0,0,0,-408.8,33.1);

	this.instance_16 = new lib.Fire1("synched",0);
	this.instance_16.setTransform(14.5,-8.6,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_17 = new lib.Fire1("synched",0);
	this.instance_17.setTransform(11.3,-12.05,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_18 = new lib.Fire1("synched",0);
	this.instance_18.setTransform(8.2,-14.8,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_19 = new lib.Fire1("synched",0);
	this.instance_19.setTransform(3.35,-16.8,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_20 = new lib.Fire1("synched",0);
	this.instance_20.setTransform(-0.7,-16.8,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_21 = new lib.Fire1("synched",0);
	this.instance_21.setTransform(-4.1,-16.8,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_22 = new lib.Fire1("synched",0);
	this.instance_22.setTransform(-11.4,-12.85,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_23 = new lib.Fire1("synched",0);
	this.instance_23.setTransform(-15.15,-2.4,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_24 = new lib.Fire1("synched",0);
	this.instance_24.setTransform(16.05,-0.85,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_25 = new lib.Fire1("synched",0);
	this.instance_25.setTransform(0.85,16.9,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_26 = new lib.Fire1("synched",0);
	this.instance_26.setTransform(-5.65,15.25,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_27 = new lib.Fire1("synched",0);
	this.instance_27.setTransform(14.5,7.25,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_28 = new lib.Fire1("synched",0);
	this.instance_28.setTransform(9.75,11.85,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_29 = new lib.Fire1("synched",0);
	this.instance_29.setTransform(-8.25,-14.8,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_30 = new lib.Fire1("synched",0);
	this.instance_30.setTransform(-13.8,-8.6,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_31 = new lib.Fire1("synched",0);
	this.instance_31.setTransform(-15.95,2.85,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_32 = new lib.Fire1("synched",0);
	this.instance_32.setTransform(-12.25,9.55,0.07,0.07,0,0,0,-408.7,17.2);

	this.instance_33 = new lib.Ring("synched",0);
	this.instance_33.setTransform(0.35,2.9,0.15,0.15,0,0,0,4.7,3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_33},{t:this.instance_32},{t:this.instance_31},{t:this.instance_30},{t:this.instance_29},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17.6,-21.8,36.1,43.7);


// stage content:
(lib.Challenger_Ziqi_Yang = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,29,59,104,134,164,194,224,225,245,419,420,432,449,509,510,522,539,599,600,613,639,699,749,834];
	this.streamSoundSymbolsList[1] = [{id:"Click",startFrame:1,endFrame:29,loop:1,offset:0}];
	this.streamSoundSymbolsList[29] = [{id:"talk",startFrame:29,endFrame:59,loop:1,offset:0}];
	this.streamSoundSymbolsList[59] = [{id:"talk",startFrame:59,endFrame:104,loop:1,offset:0}];
	this.streamSoundSymbolsList[104] = [{id:"talk",startFrame:104,endFrame:134,loop:1,offset:0}];
	this.streamSoundSymbolsList[134] = [{id:"talk",startFrame:134,endFrame:164,loop:1,offset:0}];
	this.streamSoundSymbolsList[164] = [{id:"talk",startFrame:164,endFrame:194,loop:1,offset:0}];
	this.streamSoundSymbolsList[194] = [{id:"talk",startFrame:194,endFrame:225,loop:1,offset:0}];
	this.streamSoundSymbolsList[225] = [{id:"Running",startFrame:225,endFrame:420,loop:1,offset:0}];
	this.streamSoundSymbolsList[245] = [{id:"motorcycle1wav",startFrame:245,endFrame:809,loop:4,offset:0}];
	this.streamSoundSymbolsList[420] = [{id:"Click",startFrame:420,endFrame:427,loop:1,offset:0}];
	this.streamSoundSymbolsList[432] = [{id:"firewav",startFrame:432,endFrame:510,loop:1,offset:0}];
	this.streamSoundSymbolsList[449] = [{id:"wowwav",startFrame:449,endFrame:539,loop:1,offset:0}];
	this.streamSoundSymbolsList[510] = [{id:"Click",startFrame:510,endFrame:517,loop:1,offset:0}];
	this.streamSoundSymbolsList[522] = [{id:"firewav",startFrame:522,endFrame:600,loop:1,offset:0}];
	this.streamSoundSymbolsList[539] = [{id:"wowwav",startFrame:539,endFrame:639,loop:1,offset:0}];
	this.streamSoundSymbolsList[600] = [{id:"Click",startFrame:600,endFrame:608,loop:1,offset:0}];
	this.streamSoundSymbolsList[613] = [{id:"firewav",startFrame:613,endFrame:699,loop:1,offset:0}];
	this.streamSoundSymbolsList[639] = [{id:"wowwav",startFrame:639,endFrame:749,loop:1,offset:0}];
	this.streamSoundSymbolsList[699] = [{id:"victory",startFrame:699,endFrame:835,loop:1,offset:0}];
	this.streamSoundSymbolsList[749] = [{id:"FinalCheerswav",startFrame:749,endFrame:835,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var _this = this;
		/*
		双击指定元件实例以执行相应函数。
		*/
		_this.button_1.on('click', function(){
		/*
		播放影片剪辑/视频或当前时间轴。
		播放指定的影片剪辑或视频。
		*/
		_this.play();
		});
		var _this = this;
		/*
		停止播放影片剪辑/视频
		停止播放指定影片剪辑或视频。
		*/
		_this.stop();
	}
	this.frame_1 = function() {
		var soundInstance = playSound("Click",0);
		this.InsertIntoSoundStreamData(soundInstance,1,29,1);
	}
	this.frame_29 = function() {
		var soundInstance = playSound("talk",0);
		this.InsertIntoSoundStreamData(soundInstance,29,59,1);
	}
	this.frame_59 = function() {
		var soundInstance = playSound("talk",0);
		this.InsertIntoSoundStreamData(soundInstance,59,104,1);
	}
	this.frame_104 = function() {
		var soundInstance = playSound("talk",0);
		this.InsertIntoSoundStreamData(soundInstance,104,134,1);
	}
	this.frame_134 = function() {
		var soundInstance = playSound("talk",0);
		this.InsertIntoSoundStreamData(soundInstance,134,164,1);
	}
	this.frame_164 = function() {
		var soundInstance = playSound("talk",0);
		this.InsertIntoSoundStreamData(soundInstance,164,194,1);
	}
	this.frame_194 = function() {
		var soundInstance = playSound("talk",0);
		this.InsertIntoSoundStreamData(soundInstance,194,225,1);
	}
	this.frame_224 = function() {
		var _this = this;
		/*
		双击指定元件实例以执行相应函数。
		*/
		_this.button_2.on('click', function(){
		/*
		播放影片剪辑/视频或当前时间轴。
		播放指定的影片剪辑或视频。
		*/
		_this.play();
		});
		var _this = this;
		/*
		停止播放影片剪辑/视频
		停止播放指定影片剪辑或视频。
		*/
		_this.stop();
	}
	this.frame_225 = function() {
		var soundInstance = playSound("Running",0);
		this.InsertIntoSoundStreamData(soundInstance,225,420,1);
	}
	this.frame_245 = function() {
		var soundInstance = playSound("motorcycle1wav",3);
		this.InsertIntoSoundStreamData(soundInstance,245,809,4);
	}
	this.frame_419 = function() {
		var _this = this;
		/*
		单击指定元件实例时将执行相应函数。
		*/
		_this.button_3.on('click', function(){
		/*
		播放影片剪辑/视频或当前时间轴。
		播放指定的影片剪辑或视频。
		*/
		_this.play();
		});
		var _this = this;
		/*
		停止播放影片剪辑/视频
		停止播放指定影片剪辑或视频。
		*/
		_this.stop();
	}
	this.frame_420 = function() {
		var soundInstance = playSound("Click",0);
		this.InsertIntoSoundStreamData(soundInstance,420,427,1);
	}
	this.frame_432 = function() {
		var soundInstance = playSound("firewav",0);
		this.InsertIntoSoundStreamData(soundInstance,432,510,1);
	}
	this.frame_449 = function() {
		var soundInstance = playSound("wowwav",0);
		this.InsertIntoSoundStreamData(soundInstance,449,539,1);
	}
	this.frame_509 = function() {
		var _this = this;
		/*
		单击指定元件实例时将执行相应函数。
		*/
		_this.button_5.on('click', function(){
		/*
		播放影片剪辑/视频或当前时间轴。
		播放指定的影片剪辑或视频。
		*/
		_this.play();
		});
		var _this = this;
		/*
		停止播放影片剪辑/视频
		停止播放指定影片剪辑或视频。
		*/
		_this.stop();
	}
	this.frame_510 = function() {
		var soundInstance = playSound("Click",0);
		this.InsertIntoSoundStreamData(soundInstance,510,517,1);
	}
	this.frame_522 = function() {
		var soundInstance = playSound("firewav",0);
		this.InsertIntoSoundStreamData(soundInstance,522,600,1);
	}
	this.frame_539 = function() {
		var soundInstance = playSound("wowwav",0);
		this.InsertIntoSoundStreamData(soundInstance,539,639,1);
	}
	this.frame_599 = function() {
		var _this = this;
		/*
		单击指定元件实例时将执行相应函数。
		*/
		_this.button_4.on('click', function(){
		/*
		播放影片剪辑/视频或当前时间轴。
		播放指定的影片剪辑或视频。
		*/
		_this.play();
		});
		var _this = this;
		/*
		停止播放影片剪辑/视频
		停止播放指定影片剪辑或视频。
		*/
		_this.stop();
	}
	this.frame_600 = function() {
		var soundInstance = playSound("Click",0);
		this.InsertIntoSoundStreamData(soundInstance,600,608,1);
	}
	this.frame_613 = function() {
		var soundInstance = playSound("firewav",0);
		this.InsertIntoSoundStreamData(soundInstance,613,699,1);
	}
	this.frame_639 = function() {
		var soundInstance = playSound("wowwav",0);
		this.InsertIntoSoundStreamData(soundInstance,639,749,1);
	}
	this.frame_699 = function() {
		var soundInstance = playSound("victory",0);
		this.InsertIntoSoundStreamData(soundInstance,699,835,1);
	}
	this.frame_749 = function() {
		var soundInstance = playSound("FinalCheerswav",0);
		this.InsertIntoSoundStreamData(soundInstance,749,835,1);
	}
	this.frame_834 = function() {
		var _this = this;
		/*
		单击指定元件实例时将执行相应函数。
		*/
		_this.button_6.on('click', function(){
		/*
		将播放头移动到时间轴中的指定帧编号并继续从该帧播放。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndPlay(0);
		});
		var _this = this;
		/*
		停止播放影片剪辑/视频
		停止播放指定影片剪辑或视频。
		*/
		_this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(28).call(this.frame_29).wait(30).call(this.frame_59).wait(45).call(this.frame_104).wait(30).call(this.frame_134).wait(30).call(this.frame_164).wait(30).call(this.frame_194).wait(30).call(this.frame_224).wait(1).call(this.frame_225).wait(20).call(this.frame_245).wait(174).call(this.frame_419).wait(1).call(this.frame_420).wait(12).call(this.frame_432).wait(17).call(this.frame_449).wait(60).call(this.frame_509).wait(1).call(this.frame_510).wait(12).call(this.frame_522).wait(17).call(this.frame_539).wait(60).call(this.frame_599).wait(1).call(this.frame_600).wait(13).call(this.frame_613).wait(26).call(this.frame_639).wait(60).call(this.frame_699).wait(50).call(this.frame_749).wait(85).call(this.frame_834).wait(1));

	// BUTTONS
	this.button_1 = new lib.START();
	this.button_1.name = "button_1";
	this.button_1.setTransform(208.2,133.55,0.5633,0.5633);
	new cjs.ButtonHelper(this.button_1, 0, 1, 2);

	this.button_2 = new lib.GO();
	this.button_2.name = "button_2";
	this.button_2.setTransform(259.3,254.4,0.75,0.75);
	new cjs.ButtonHelper(this.button_2, 0, 1, 2);

	this.button_3 = new lib.RIGHT();
	this.button_3.name = "button_3";
	this.button_3.setTransform(379.25,145.85,0.6,0.6,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.button_3, 0, 1, 2);

	this.button_5 = new lib.LEFT();
	this.button_5.name = "button_5";
	this.button_5.setTransform(163.5,145.85,0.6,0.6,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.button_5, 0, 1, 2);

	this.button_4 = new lib.ACC();
	this.button_4.name = "button_4";
	this.button_4.setTransform(212.45,154.45,0.75,0.75,0,0,0,-101,-55.9);
	new cjs.ButtonHelper(this.button_4, 0, 1, 2);

	this.button_6 = new lib.REPLAY();
	this.button_6.name = "button_6";
	this.button_6.setTransform(324.6,275.9,0.4,0.4);
	new cjs.ButtonHelper(this.button_6, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.button_1}]}).to({state:[]},1).to({state:[{t:this.button_2}]},223).to({state:[]},1).to({state:[{t:this.button_3}]},194).to({state:[]},1).to({state:[{t:this.button_5}]},89).to({state:[]},1).to({state:[{t:this.button_4}]},89).to({state:[]},1).to({state:[{t:this.button_6}]},234).wait(1));

	// ENDINGGRAPH
	this.instance = new lib.SideviewMotorcycle();
	this.instance.setTransform(-152.1,235,0.75,0.75,-3.9994,0,0,89.2,-15.8);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(824).to({_off:false},0).to({x:218.6,y:201.75},10).wait(1));

	// ENDINGWORD
	this.instance_1 = new lib.Text11();
	this.instance_1.setTransform(512.25,197,1,1,0,0,0,3.5,28.7);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(824).to({_off:false},0).to({scaleX:1.51,scaleY:1.51,x:291.55,y:101.3},10).wait(1));

	// ENDING
	this.instance_2 = new lib.Flag("synched",0);
	this.instance_2.setTransform(220.8,303.55,0.6644,0.6644,93.8952,0,0,-35.8,-278.2);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(814).to({_off:false},0).to({regX:-35.7,regY:-278.1,rotation:-56.1056,x:203.6,y:287.55},20).wait(1));

	// BLOCK
	this.instance_3 = new lib.BlackRectangle();
	this.instance_3.setTransform(204.55,128,1,1,0,0,0,2,11);
	this.instance_3.alpha = 0.5;

	this.instance_4 = new lib.WhiteRectangle();
	this.instance_4.setTransform(198.15,113.2,1,1,0,0,0,2,11);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({_off:true},1).wait(223).to({_off:false,x:226.75,y:117.9,alpha:0},0).to({alpha:1},20).to({_off:true},1).wait(565).to({_off:false,x:211.6,y:154.1,alpha:0},0).to({alpha:0.5},24).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(799).to({_off:false},0).to({alpha:1},10).to({_off:true},1).wait(25));

	// WORDS
	this.instance_5 = new lib.Coach();
	this.instance_5.setTransform(139.5,185.3,0.66,0.66,0,0,0,213.1,-31.6);

	this.instance_6 = new lib.Rider();
	this.instance_6.setTransform(287.75,155.7,0.66,0.66,0,0,0,14.5,54.1);

	this.instance_7 = new lib.SideviewMotorcycle();
	this.instance_7.setTransform(278.7,173.8,0.62,0.62,0,0,0,89.5,-15.8);

	this.instance_8 = new lib.TalkingBackground();
	this.instance_8.setTransform(396.3,131.1,1,1,0,0,0,107.5,125);

	this.instance_9 = new lib.Text1();
	this.instance_9.setTransform(210.9,71,0.7,0.7,0,0,0,-42.5,-29.3);

	this.instance_10 = new lib.Text2();
	this.instance_10.setTransform(213.5,71.55,0.7,0.7,0,0,0,-42.6,-29.4);

	this.instance_11 = new lib.Text3();
	this.instance_11.setTransform(217.35,75.4,0.7,0.7,0,0,0,-42.6,-29.4);

	this.instance_12 = new lib.Text4();
	this.instance_12.setTransform(210.65,74.2,0.7,0.7,0,0,0,-41.6,-29.3);

	this.instance_13 = new lib.Text5();
	this.instance_13.setTransform(210.9,80.55,0.7,0.7,0,0,0,-42.6,-29.4);

	this.instance_14 = new lib.Text6();
	this.instance_14.setTransform(209.65,78.55,0.7,0.7,0,0,0,-42.6,-29.4);

	this.instance_15 = new lib.Text7();
	this.instance_15.setTransform(216,84.4,0.7,0.7,0,0,0,-55.6,-30.3);

	this.instance_16 = new lib.Text8();
	this.instance_16.setTransform(207.75,66.1,1,1,0,0,0,5.5,55.8);

	this.instance_17 = new lib.Text9();
	this.instance_17.setTransform(209.3,61.1,1.5,1.5,0,0,0,29.2,8);

	this.instance_18 = new lib.Text10();
	this.instance_18.setTransform(206.05,61.4,1.66,1.66,0,0,0,31.8,8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5}]}).to({state:[{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_9}]},1).to({state:[{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_10}]},28).to({state:[{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_11}]},30).to({state:[{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5}]},30).to({state:[{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_12}]},15).to({state:[{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_13}]},30).to({state:[{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_14}]},30).to({state:[{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_15}]},30).to({state:[{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5}]},30).to({state:[]},21).to({state:[{t:this.instance_16}]},54).to({state:[{t:this.instance_17}]},30).to({state:[]},30).to({state:[{t:this.instance_18}]},420).to({state:[]},20).wait(36));

	// MOTORCYCLE
	this.instance_19 = new lib.FirstviewMotorcycle("synched",0);
	this.instance_19.setTransform(212.7,276.15,0.28,0.28,0,0,0,15.3,114.1);
	this.instance_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(245).to({_off:false},0).wait(54).to({startPosition:0},0).wait(30).to({startPosition:0},0).wait(30).to({startPosition:0},0).wait(390).to({startPosition:0},0).wait(30).to({startPosition:14},0).wait(30).to({startPosition:12},0).to({_off:true},1).wait(25));

	// RAMP
	this.instance_20 = new lib.Right("synched",0);
	this.instance_20.setTransform(234.25,98.75,0.15,0.15,0,0,0,39.6,21);
	this.instance_20._off = true;

	this.instance_21 = new lib.Middle("synched",0);
	this.instance_21.setTransform(214.05,91.6,0.22,0.22,0,0,0,39.6,20.7);
	this.instance_21._off = true;

	this.instance_22 = new lib.Finishline("synched",0);
	this.instance_22.setTransform(214.75,113.8,0.1407,0.0162,0,0,0,-92.4,21.6);
	this.instance_22._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(419).to({_off:false},0).to({regX:39.7,scaleX:1.05,scaleY:1.05,y:110.8},15).to({regX:39.8,scaleX:2.2199,scaleY:2.2199,x:384.35,y:520.6},15).to({_off:true},1).wait(59).to({_off:false,regX:39.7,scaleX:0.15,scaleY:0.15,skewY:180,x:194.95,y:98.75},0).to({scaleX:1.05,scaleY:1.05,x:169.3,y:110.8},15).to({regX:39.8,scaleX:2.2199,scaleY:2.2199,x:37.65,y:520.6},15).to({_off:true},1).wait(295));
	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(599).to({_off:false},0).to({scaleX:1.64,scaleY:1.06,x:214.35,y:116.75},20).to({scaleX:2.36,scaleY:1.5253,x:195.45,y:446.1},20).to({_off:true},1).wait(195));
	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(734).to({_off:false},0).to({regX:-92.9,regY:21.7,scaleX:0.24,scaleY:0.24,y:120.5},15).to({regX:-92.8,regY:22.4,scaleX:2.9399,scaleY:2.9399,x:214.15,y:381.75},20).to({_off:true},11).wait(55));

	// FIRERING
	this.instance_23 = new lib._2("synched",0);
	this.instance_23.setTransform(226.55,-130.2,9.0192,9.0192);
	this.instance_23._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(630).to({_off:false},0).to({scaleX:14.5195,scaleY:14.5195,x:193.1,y:123.8},21).to({_off:true},1).wait(183));

	// FIRERING
	this.instance_24 = new lib._2("synched",0);
	this.instance_24.setTransform(226.55,-130.2,9.0192,9.0192);
	this.instance_24._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(625).to({_off:false},0).to({scaleX:14.5195,scaleY:14.5195,x:193.1,y:123.8},20).to({_off:true},1).wait(189));

	// FIRERING
	this.instance_25 = new lib._2("synched",0);
	this.instance_25.setTransform(225.35,67.45);
	this.instance_25._off = true;

	this.instance_26 = new lib._1("synched",0);
	this.instance_26.setTransform(214.9,51.65,1.28,1.28);
	this.instance_26._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(419).to({_off:false},0).to({scaleX:4.36,scaleY:4.36,x:161.5,y:-60.75},15).to({scaleX:14.5195,scaleY:14.5195,x:193.1,y:123.8},15).to({_off:true},1).wait(59).to({_off:false,scaleX:1,scaleY:1,x:203.6,y:67.45},0).to({scaleX:7.7598,scaleY:7.7598,x:226.6,y:-115.7},15).to({scaleX:14.5195,scaleY:14.5195,x:193.1,y:123.8},15).to({_off:true},1).wait(59).to({_off:false,scaleX:9.0192,scaleY:9.0192,x:226.55,y:-130.2},20).to({scaleX:14.5195,scaleY:14.5195,x:193.1,y:123.8},20).to({_off:true},1).wait(195));
	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(599).to({_off:false},0).to({_off:true,scaleX:9.0192,scaleY:9.0192,x:226.55,y:-130.2},20).wait(216));

	// TRACK
	this.instance_27 = new lib.Track("synched",0);
	this.instance_27.setTransform(227.4,246.65,1,1,0,0,0,50.1,4.2);
	this.instance_27._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(245).to({_off:false},0).wait(54).to({startPosition:6},0).wait(30).to({startPosition:12},0).wait(30).to({startPosition:18},0).wait(60).to({startPosition:0},0).to({x:115.9,startPosition:15},15).to({x:133.5,y:409.5,startPosition:6},15).to({x:115.9,y:246.65,startPosition:15},15).to({x:227.4,startPosition:12},15).wait(30).to({startPosition:18},0).to({x:314.05,startPosition:9},15).to({x:313.15,y:409.5,startPosition:6},15).to({x:314.05,y:246.65,startPosition:9},15).to({x:227.4,startPosition:6},15).wait(30).to({startPosition:12},0).to({startPosition:3},20).to({y:438.05,startPosition:18},20).wait(20).to({startPosition:14},0).to({y:246.65,startPosition:9},20).to({startPosition:0},20).wait(50).to({startPosition:0},0).wait(30).to({startPosition:6},0).wait(30).to({startPosition:12},0).to({_off:true},1).wait(25));

	// RampPopOut
	this.instance_28 = new lib.Right("synched",0);
	this.instance_28.setTransform(234.25,165.95,0.15,0.15,0,0,0,39.7,21);
	this.instance_28._off = true;

	this.instance_29 = new lib.Middle("synched",0);
	this.instance_29.setTransform(214.05,182.65,0.22,0.22,0,0,0,39.6,20.7);
	this.instance_29._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(389).to({_off:false},0).to({regX:39.6,y:98.75},30).to({_off:true},1).wait(59).to({_off:false,regX:39.7,skewY:180,x:193.35,y:165.5},0).to({x:194.95,y:98.75},30).to({_off:true},1).wait(325));
	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(569).to({_off:false},0).to({y:91.6},30).to({_off:true},1).wait(235));

	// RingPopOut
	this.instance_30 = new lib._1("synched",0);
	this.instance_30.setTransform(225.35,135.55);
	this.instance_30._off = true;

	this.instance_31 = new lib._2("synched",0);
	this.instance_31.setTransform(225.35,67.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_30}]},389).to({state:[{t:this.instance_31,p:{x:225.35}}]},30).to({state:[]},1).to({state:[{t:this.instance_30}]},59).to({state:[{t:this.instance_31,p:{x:203.6}}]},30).to({state:[]},1).to({state:[{t:this.instance_30}]},59).to({state:[{t:this.instance_30}]},30).to({state:[]},1).wait(235));
	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(389).to({_off:false},0).to({_off:true,y:67.45},30).wait(60).to({_off:false,x:202.8,y:135.55},0).to({_off:true,x:203.6,y:67.45},30).wait(60).to({_off:false,scaleX:1.28,scaleY:1.28,x:214.9,y:141.6},0).to({y:51.65},30).to({_off:true},1).wait(235));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-358.5,-176.7,1344.1,922.7);
// library properties:
lib.properties = {
	id: 'CF72702BE15D0147B395B970EB9B0A77',
	width: 400,
	height: 300,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"sounds/Click.mp3", id:"Click"},
		{src:"sounds/FinalCheerswav.mp3", id:"FinalCheerswav"},
		{src:"sounds/firewav.mp3", id:"firewav"},
		{src:"sounds/motorcycle1wav.mp3", id:"motorcycle1wav"},
		{src:"sounds/Running.mp3", id:"Running"},
		{src:"sounds/talk.mp3", id:"talk"},
		{src:"sounds/victory.mp3", id:"victory"},
		{src:"sounds/wowwav.mp3", id:"wowwav"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['CF72702BE15D0147B395B970EB9B0A77'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;