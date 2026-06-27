import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, AppState, AppStateStatus } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import { Camera, useCameraDevices, useCameraPermission } from 'react-native-vision-camera';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useKeepAwake } from 'expo-keep-awake';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useFatigueStore, FatigueState } from '../store/fatigueStore';
import FatigueGauge from '../components/FatigueGauge';
import StatusIndicator from '../components/StatusIndicator';
import ThreeColorFlash, { FlashColor } from '../components/ThreeColorFlash';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { MonitoringCoordinator } from '../services/MonitoringCoordinator';
import { AlertService } from '../services/AlertService';
import { useV5FaceDetection } from '../hooks/useV5FaceDetection';
import { T } from '../i18n/locale';
import type { FaceFeatures, ConfirmMethod } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Monitoring'>;
const SMILE = 0.7, EYES_TH = 0.8, FR = 0.45;
const FL: Record<FatigueState, FlashColor> = { normal: 'white', mild: 'white', severe: 'red', critical: 'red' };
const FLABEL: Record<FatigueState, string> = { normal: 'fatigueNormal', mild: 'fatigueMild', severe: 'fatigueSevere', critical: 'fatigueCritical' };
type B = { left: number; top: number; right: number; bottom: number }; type Fv = { bounds?: B; smilingProbability?: number };
function ov(fb: B, w: number, h: number): number { const fw = w * FR, fh = h * FR, fl = (w - fw) / 2, fr2 = (w + fw) / 2, ft = (h - fh) / 2, fb2 = (h + fh) / 2, il = Math.max(fb.left, fl), ir = Math.min(fb.right, fr2), it = Math.max(fb.top, ft), ib = Math.min(fb.bottom, fb2); if (il >= ir || it >= ib) return 0; const a = (ir - il) * (ib - it), b2 = (fb.right - fb.left) * (fb.bottom - fb.top); return b2 <= 0 ? 0 : a / b2; }

export default function MS() {
  const nv = useNavigation<Nav>(); const ins = useSafeAreaInsets(); useKeepAwake();
  const { currentScore, currentState, faceVisible, setCurrentScore, setIsMonitoring, setFaceVisible, reset } = useFatigueStore();
  const [al, setAl] = useState(false); const [cv, setCv] = useState(false); const [cm, setCm] = useState<ConfirmMethod | null>(null);
  const [el, setEl] = useState(0); const [ca, setCa] = useState(false); const [ck, setCk] = useState(0);
  const { hasPermission: cp, requestPermission: rp } = useCameraPermission();
  const _d = useCameraDevices(); const dv = useMemo(() => { const l = (Array.isArray(_d) ? _d : Object.values(_d)).filter(Boolean); return l.find((d: any) => String(d.position) === 'front') || l[0] || null; }, [ck, _d]);
  const cr = useRef<any>(null);
  const [et, setEt] = useState('normal'); const [ht, setHt] = useState('normal'); const [mt, setMt] = useState('normal');
  const [nf, setNf] = useState(false); const [ff, setFf] = useState(false);
  useEffect(() => { rp(); }, []);

  const mr = useRef(false); const cvRef = useRef(false);
  const sR = useRef(false); const lR = useRef(false);
  const nT = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fT = useRef<ReturnType<typeof setTimeout> | null>(null);
  const la = useRef(0); const aR = useRef<AppStateStatus>(AppState.currentState);
  const fs = useRef<{ w: number; h: number }>({ w: 480, h: 640 });
  const wu = useRef(0); const lc = useRef(0); const ed = useRef(false);
  const isAl = useRef(false);
  useEffect(() => { cvRef.current = cv; }, [cv]);

  const cl = useCallback(() => { isAl.current = false; try { AlertService.forceStop(); } catch (e) { } try { MonitoringCoordinator.resetScoring(); } catch (e) { } try { setAl(false); } catch (e) { } try { setCv(false); } catch (e) { } try { setCm(null); } catch (e) { } try { setNf(false); } catch (e) { } try { setFf(false); } catch (e) { } if (nT.current) { clearTimeout(nT.current); nT.current = null; } if (fT.current) { clearTimeout(fT.current); fT.current = null; } try { setCurrentScore(0); } catch (e) { } la.current = 0; }, [setCurrentScore]);

  const doAlert = useCallback((lv: string) => { if (isAl.current) return; isAl.current = true; try { AlertService.triggerAlert(lv); } catch (e) { } lc.current = Date.now() + 2000; ed.current = false; setAl(true); setCv(true); }, []);
  const tA = useCallback(() => { if (Date.now() < wu.current) return; const s = Math.max(la.current + 15, 80); try { setCurrentScore(s); } catch (e) { } la.current = s; doAlert('level4'); }, [setCurrentScore, doAlert]);

  const hF = useCallback((fe: FaceFeatures[], ra?: Fv[]) => {
    if (!mr.current) return;
    if (fe.length > 0 && fe[0].faceDetected) {
      const f = fe[0]; MonitoringCoordinator.processFrame(f); setFaceVisible(true, 0.9);
      const a = (f.leftEyeOpenProbability + f.rightEyeOpenProbability) / 2;
      setEt(a < 0.2 ? 'eyesClosed' : a < 0.5 ? 'blinkFreq' : 'normal');
      setHt(f.headEulerAngleX > 15 ? 'headDown' : Math.abs(f.headEulerAngleY) > 20 ? 'headShake' : 'normal');
      setMt(f.mouthOpenProbability > 0.7 ? 'mouthOpen' : 'normal');
      sR.current = f.mouthOpenProbability > SMILE; lR.current = a > EYES_TH && Math.abs(f.headEulerAngleX) < 10 && Math.abs(f.headEulerAngleY) < 10;
      if (nT.current) { clearTimeout(nT.current); nT.current = null; }
      if (nf) { cl(); return; }
      const r = ra?.[0]; const { w, h } = fs.current;
      if (r?.bounds) { const o = ov(r.bounds, w, h); if (o < 0.4) { if (!fT.current) fT.current = setTimeout(() => { setFf(true); tA(); }, 1500); } else { if (fT.current) { clearTimeout(fT.current); fT.current = null; } setFf(false); } }
      if (cvRef.current && (sR.current || lR.current) && Date.now() >= lc.current) { setCm(sR.current ? 'smile' : 'looking'); cl(); }
    } else {
      MonitoringCoordinator.processFrame({ faceDetected: false, timestamp: Date.now(), leftEyeOpenProbability: 1, rightEyeOpenProbability: 1, headEulerAngleX: 0, headEulerAngleY: 0, headEulerAngleZ: 0, mouthOpenProbability: 0 });
      setFaceVisible(false, 0);
      if (!nT.current && Date.now() >= wu.current) { nT.current = setTimeout(function () { setNf(true); doAlert('level3'); nT.current = null; }, 3000); }
    }
  }, [setFaceVisible, setCurrentScore, tA, cl, doAlert, nf]);

  const { init: id, release: rd } = useV5FaceDetection({ onFacesDetected: hF, intervalMs: 400, getFrame: async () => { if (!cr.current) return null; try { const sn = await cr.current.takeSnapshot({ quality: 70 }); if (!sn || !sn.path) return null; if (sn.width && sn.height) fs.current = { w: sn.width, h: sn.height }; await new Promise(r => setTimeout(r, 50)); return { filePath: sn.path }; } catch (e) { return null; } }, });

  const pu = useSharedValue(1); useEffect(() => { pu.value = withRepeat(withTiming(1.3, { duration: 1000 }), -1, true); return () => { pu.value = 1; }; }, []);
  const ps = useAnimatedStyle(() => ({ transform: [{ scale: pu.value }] }));
  useEffect(() => { if (!useFatigueStore.getState().isMonitoring) return; const i = setInterval(() => setEl(p => p + 1), 1000); return () => clearInterval(i); }, []);
  const fm = (t: number) => `${String(Math.floor(t / 3600)).padStart(2, '0')}:${String(Math.floor(t % 3600 / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
  const oA = useCallback((s: AppStateStatus) => {
  if (s === 'active' && aR.current !== 'active') {
    setCa(false);
    rd();
    setTimeout(() => { setCk(k => k + 1); setCa(true); id(); }, 1000);
  } else if (s !== 'active') { setCa(false); }
  aR.current = s;
}, [rd, id]);

  const sM = useCallback(async () => { wu.current = Date.now() + 3000; ed.current = false; isAl.current = false; setNf(false); setCurrentScore(0); la.current = 0; mr.current = true; setIsMonitoring(true); setCa(true); await AlertService.init(); await id(); await MonitoringCoordinator.startMonitoring(); }, [setIsMonitoring, id]);
  const pM = useCallback(() => { mr.current = false; setCa(false); setIsMonitoring(false); cl(); rd(); MonitoringCoordinator.stopMonitoring(); }, [setIsMonitoring, cl, rd]);
  useEffect(() => { sM(); const s = AppState.addEventListener('change', oA); return () => { pM(); s.remove(); }; }, []);

  useEffect(() => { if (currentState !== 'severe' && currentState !== 'critical') { ed.current = false; return; } if (ed.current) return; ed.current = true; doAlert('level2'); }, [currentState, doAlert]);

  const dS = useCallback(() => { pM(); reset(); nv.goBack(); }, [pM, reset, nv]);
  const dM = useCallback(() => { cl(); }, [cl]);
  const dB = useCallback(() => nv.goBack(), [nv]);

  const eOk = et === 'normal', hOk = ht === 'normal', mOk = mt === 'normal';
  const fS = faceVisible ? T('faceFound') : T('faceLost'), fOk = faceVisible;
  const fOn = (al || nf || ff) && cv;
  const fB = nf || ff ? '#FF4444' : 'rgba(255,255,255,0.4)';

  return (<View style={s.c}><StatusBar hidden />
    <View style={[s.tb, { paddingTop: ins.top + 8 }]}>
      <TouchableOpacity style={s.bb} onPress={dB}><Text style={s.bbt}>{T('back')}</Text></TouchableOpacity>
      <View style={s.ms}><Animated.View style={[s.dot, ps]} /><Text style={s.ml}>{T('monitoring')} · {T(FLABEL[currentState])}</Text></View>
      <Text style={s.el}>{fm(el)}</Text>
    </View>
    <View style={s.cs}>{(dv && cp) ? (<Camera key={ck} ref={cr} device={dv} isActive={ca && useFatigueStore.getState().isMonitoring} style={StyleSheet.absoluteFill} />) : (<View style={StyleSheet.absoluteFill} />)}
      <View style={[s.fr, { borderColor: fB }]} pointerEvents="none"><View style={[s.co, s.cTL]} /><View style={[s.co, s.cTR]} /><View style={[s.co, s.cBL]} /><View style={[s.co, s.cBR]} /></View>
      {nf && (<View style={s.fw} pointerEvents="none"><Text style={s.fwt}>{T('warnNoFace')}</Text></View>)}
    </View>
    <View style={s.gs}><FatigueGauge score={currentScore} size={180} /></View>
    <View style={s.is}><StatusIndicator label={T('lEye')} statusText={T(et)} isNormal={eOk} /><StatusIndicator label={T('lHead')} statusText={T(ht)} isNormal={hOk} /><StatusIndicator label={T('lMouth')} statusText={T(mt)} isNormal={mOk} /><StatusIndicator label={T('lFace')} statusText={fS} isNormal={fOk} /></View>
    <View style={[s.bot, { paddingBottom: ins.bottom + 8 }]}><TouchableOpacity style={s.sb} onPress={dS}><Text style={s.sbt}>{T('btnStop')}</Text></TouchableOpacity></View>
    <ThreeColorFlash flashActive={fOn} currentColor={FL[currentState]} opacity={0.3} />
    <ConfirmationDialog visible={cv} confirmMethod={cm} onSmileConfirm={() => { }} onLookConfirm={() => { }} onManualConfirm={dM} />
  </View>);
}

const s = StyleSheet.create({
  c: { flex: 1, backgroundColor: '#0A0A0A' },
  tb: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#0D0D0D', borderBottomWidth: 1, borderBottomColor: '#1A1A1A' },
  bb: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#1A1A1A' }, bbt: { color: '#AAA', fontSize: 14, fontWeight: '600' },
  ms: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4CAF50' }, ml: { color: '#CCC', fontSize: 14, fontWeight: '600' },
  el: { color: '#888', fontSize: 13, fontVariant: ['tabular-nums'], fontWeight: '500' },
  cs: { height: 240, marginHorizontal: 16, marginTop: 12, borderRadius: 16, overflow: 'hidden', backgroundColor: '#1A1A1A', position: 'relative' },
  fr: { position: 'absolute', left: '27.5%', top: '27.5%', width: '45%', height: '45%', borderWidth: 2, borderRadius: 4 },
  co: { position: 'absolute', width: 20, height: 20, borderColor: '#4CAF50' },
  cTL: { top: -1, left: -1, borderTopWidth: 3, borderLeftWidth: 3 }, cTR: { top: -1, right: -1, borderTopWidth: 3, borderRightWidth: 3 },
  cBL: { bottom: -1, left: -1, borderBottomWidth: 3, borderLeftWidth: 3 }, cBR: { bottom: -1, right: -1, borderBottomWidth: 3, borderRightWidth: 3 },
  fw: { position: 'absolute', bottom: 12, left: 12, right: 12, backgroundColor: 'rgba(255,0,0,0.8)', borderRadius: 8, padding: 8, alignItems: 'center' },
  fwt: { color: '#FFF', fontSize: 14, fontWeight: '700' },
  gs: { alignItems: 'center', marginTop: 16, marginBottom: 8 }, is: { flex: 1, paddingHorizontal: 16, justifyContent: 'center' },
  bot: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#0D0D0D', borderTopWidth: 1, borderTopColor: '#1A1A1A' },
  sb: { borderRadius: 14, backgroundColor: '#F44336', paddingVertical: 14, alignItems: 'center', justifyContent: 'center' },
  sbt: { fontSize: 17, fontWeight: '700', color: '#FFF' },
});
