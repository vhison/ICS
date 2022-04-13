## installation

### install global dependencies

Install Android Studio:
https://developer.android.com/studio/
Install Xcode:
https://apps.apple.com/us/app/xcode/id497799835?mt=12
Install xcode tools:

```
sudo xcode-select --install
```

Install cocapods:
https://guides.cocoapods.org/using/getting-started.html

```
sudo gem install cocoapods
```

Install react-native dependencies (React Native iOS and Android):
https://reactnative.dev/docs/environment-setup

### install local dependencies

```
cd ICS
yarn
cd ios && pod install
```

Launch ios:
```
yarn ios
```
Launch android:
```
yarn android
```