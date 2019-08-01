/* 
			 * 参数中的 kernel 就是卷积核方阵，不过顺着排列成了一个九位的数组
			 * 像是这样 [-1, -1, -1, -1, 8, -1, -1, -1, -1]
			 * offset 对RGBA数值直接增加，表现为提高亮度
			 * 下面的for循环
			 * y 代表行，x 代表列，c 代表RGBA
			 * kernelWidth为卷积核大小 目前必须为奇数，比如3，5，7
			 */
			function convolutionMatrix(imgData, kernel, kernelWidth, divisor) {
				offset = 0
				var canvasTemp = document.createElement('canvas');
				canvasTemp.width = imgData.width; //☜
				canvasTemp.height = imgData.height;
				var ctx = canvasTemp.getContext("2d");
//				ctx.drawImage(inputImg, 0, 0);
//				var imgData = ctx.getImageData(0, 0, canvasTemp.width, canvasTemp.height);

				let output = ctx.createImageData(canvasTemp.width, canvasTemp.height)
				let w = canvasTemp.width,
					h = canvasTemp.height
				let iD = imgData.data,
					oD = output.data
				halfKernelWidth = (kernelWidth - 1) / 2;
				for(let y = 0; y < h - 0; y += 1) {
					for(let x = 0; x < w - 0; x += 1) {
						for(let c = 0; c < 3; c += 1) {
							let i = (y * w + x) * 4 + c
							//							oD[i] =
							//								offset +
							//								(kernel[0] * iD[i - w * 4 - 4] +
							//									kernel[1] * iD[i - w * 4] +
							//									kernel[2] * iD[i - w * 4 + 4] +
							//									kernel[3] * iD[i - 4] +
							//									kernel[4] * iD[i] +
							//									kernel[5] * iD[i + 4] +
							//									kernel[6] * iD[i + w * 4 - 4] +
							//									kernel[7] * iD[i + w * 4] +
							//									kernel[8] * iD[i + w * 4 + 4])
							var colorValue = 0;
							for(m = -1 * halfKernelWidth; m <= halfKernelWidth; m++) {
								for(n = -1 * halfKernelWidth; n <= halfKernelWidth; n++) {

									pointIndex = i + 4 * (w * n + m);
									if(pointIndex>=0 && pointIndex<w*h*4){
									k = m * kernelWidth + n + (kernelWidth * kernelWidth - 1) / 2;
									colorValue += kernel[k] * iD[pointIndex]
									}
								}
							}
							oD[i] = colorValue / divisor;
						}
						oD[(y * w + x) * 4 + 3] = 255
					}
				}
				return output;
				//ctx.putImageData(output, 0, 0)
			}
			
			/**
			 * 高斯模糊
			 * @param {Object} inputImg
			 */
			function blur(inputImg, width){
				//kernel = [-1, -1, -1, -1, 8, -1, -1, -1, -1, ]
//				kernel = [1, 1, 1, 1, 1, 1, 1, 1, 1]
//				kernel = new Array()
//				for(m=0;m<width*width;m++){
//					kernel[m]=1;
//				}
//				
//				newBg = convolutionMatrix(inputImg, kernel, width, width*width)
//				return newBg;
				
				var gaussMatrix = [],
			        gaussSum = 0,
			        x, y,
			        r, g, b, a,
			        i, j, k, len;
			
			    var radius = 10;
			    var sigma = 5;
			
			    a = 1 / (Math.sqrt(2 * Math.PI) * sigma);
			    b = -1 / (2 * sigma * sigma);
			    //生成高斯矩阵
			    i = 0;
			    for (y = -radius; y <= radius; y++){
			    	for (x = -radius; x <= radius; x++){
			    		distince = Math.sqrt(x*x+y*y);
			    		g = a * Math.exp(b * distince * distince);
			        	gaussMatrix[i] = g;
			        	gaussSum += g;
			    		i++;
			    	}
			    }
			    //归一化, 保证高斯矩阵的值在[0,1]之间
			    for (i = 0, len = gaussMatrix.length; i < gaussMatrix.length; i++) {
			        gaussMatrix[i] /= gaussSum;
			    }
			    
			    newBg = convolutionMatrix(inputImg, gaussMatrix, 2*radius+1, 1)
				return newBg;
			}
			
			/**
			 * 边缘检测
			 * @param {Object} inputImg
			 */
			function edge(inputImg, width){
				kernel = [-1, -1, -1, -1, 8, -1, -1, -1, -1, ]
				//kernel = [1, 1, 1, 1, -8, 1, 1, 1, 1, ]
				newBg = convolutionMatrix(inputImg, kernel, 3, 1)
				return newBg;
			}

			/**
			 * 马赛克处理
			 * @param {Object} inputImg
			 */
			function mosaic(inputImg) {
				console.log("马赛克处理开始");
				var canvasTemp = document.createElement('canvas');
				canvasTemp.width = inputImg.width; //☜
				canvasTemp.height = inputImg.height;
				var ctx = canvasTemp.getContext("2d");
				let output = ctx.createImageData(inputImg.width, inputImg.height);
				let w = inputImg.width,
					h = inputImg.height;
				let iD = inputImg.data,
					oD = output.data;
				let px = 6;
				for(let y = 0; y < h; y += px) {
					for(let x = 0; x < w; x += px) {
						for(let my = 0; my < px; my++) {
							for(let mx = 0; mx < px; mx++) {
								oD[((y + my) * w + x + mx) * 4 + 3] = 255;
								if(x + mx >= w) continue;
								oD[((y + my) * w + x + mx) * 4 + 0] = iD[(y * w + x) * 4 + 0];
								oD[((y + my) * w + x + mx) * 4 + 1] = iD[(y * w + x) * 4 + 1];
								oD[((y + my) * w + x + mx) * 4 + 2] = iD[(y * w + x) * 4 + 2];
							}
						}
					}
				}
				console.log("马赛克处理结束");
				return output;
			}

			/**
			 * 灰度处理
			 * @param {Object} inputImg
			 */
			function black(inputImg) {
				var canvasTemp = document.createElement('canvas');
				canvasTemp.width = inputImg.width; //☜
				canvasTemp.height = inputImg.height;
				var ctx = canvasTemp.getContext("2d");
				let output = ctx.createImageData(inputImg.width, inputImg.height);
				let w = inputImg.width,
					h = inputImg.height;
				let iD = inputImg.data,
					oD = output.data;
				for(let y = 0; y < h; y += 1) {
					for(let x = 0; x < w; x += 1) {
						let i = (y * w + x) * 4;
						oD[i] = (iD[i] + iD[i + 1] + iD[i + 2]) / 3;
						oD[i + 1] = oD[i];
						oD[i + 2] = oD[i];
						oD[i + 3] = 255;
					}
				}
				return output;
			}
			
var imageEffects = 
{
	convolutionMatrix,
	blur,
	edge,
	mosaic,
	black
}

module.exports = imageEffects
