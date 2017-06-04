win32:
	electron-packager . --icon=logo.ico --platform=win32 --arch=ia32 --out=builds/windows

win64:
	electron-packager . --icon=logo.ico --platform=win32 --arch=x64 --out=builds/windows

windows: win32 win64

lin32:
	electron-packager . --icon=logo.ico --platform=linux --arch=ia32 --out=builds/linux

lin64:
	electron-packager . --icon=logo.ico --platform=linux --arch=x64 --out=builds/linux

linux: lin32 lin64

darwin:
	electron-packager . --icon=logo.ico --platform=darwin --out=builds/mac

all: windows linux darwin

clear:
	rm -rf builds
