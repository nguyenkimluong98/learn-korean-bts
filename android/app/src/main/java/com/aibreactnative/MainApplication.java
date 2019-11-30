package com.aibreactnative;

import android.support.multidex.MultiDexApplication;

import com.aibreactnative.modules.admob.RNAdMobPackage;
import com.aibreactnative.modules.aib.AIBReactPackage;
import com.aibreactnative.modules.fabric.FabricPackage;
import com.aibreactnative.modules.i18n.RNI18nPackage;
import com.aibreactnative.modules.lottie.LottiePackage;
import com.aibreactnative.modules.share.RNSharePackage;
import com.aibreactnative.modules.share.ShareApplication;
import com.aibreactnative.modules.sound.RNSoundPackage;
import com.crashlytics.android.Crashlytics;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.oblador.vectoricons.VectorIconsPackage;

import java.util.Arrays;
import java.util.List;

import io.fabric.sdk.android.Fabric;

public class MainApplication extends MultiDexApplication implements ReactApplication, ShareApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new RNI18nPackage(),
                    new AIBReactPackage(),
                    new RNAdMobPackage(),
                    new LottiePackage(),
                    new RNSharePackage(),
                    new FabricPackage(),
                    new RNSoundPackage(),
                    new VectorIconsPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        Fabric.with(this, new Crashlytics());
    }

    @Override
    public String getFileProviderAuthority() {
        return getPackageName() + ".provider";
    }
}
