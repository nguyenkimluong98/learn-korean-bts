package com.aibreactnative.modules.sound;

import android.content.Context;
import android.content.res.Resources;
import android.media.MediaPlayer;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class RNSoundModule extends ReactContextBaseJavaModule {

    MediaPlayer mediaPlayer;

    public RNSoundModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RNSound";
    }

    @ReactMethod
    public void play(String soundName) {
        if (mediaPlayer != null) {
            if (mediaPlayer.isPlaying()) {
                mediaPlayer.stop();
                mediaPlayer.release();
            }
            mediaPlayer = null;
        }

        Context context = getReactApplicationContext();
        Resources res = context.getResources();
        int soundId = res.getIdentifier(soundName, "raw", context.getPackageName());
        mediaPlayer = MediaPlayer.create(context, soundId);
        mediaPlayer.start();
    }

}
