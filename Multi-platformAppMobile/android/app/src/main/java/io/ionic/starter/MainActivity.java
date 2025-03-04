package io.ionic.starter;

import android.os.Bundle;
import android.webkit.WebSettings;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Permitir contenido mixto en el WebView (solo para desarrollo)
    if (getBridge().getWebView() != null) {
      getBridge().getWebView().getSettings()
        .setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
    }
  }
}
