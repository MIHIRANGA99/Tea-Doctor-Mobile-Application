import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import mainStyles from "../../constants/mainStyles";
import { COLOR_PALETTE } from "../../constants/colors";

const Treatments = ({ navigation, route }: { navigation: any; route: any }) => {
  const [treatments, setTreatments] = useState<string>("");

  useEffect(() => {
    console.log(route.params);
  }, [route]);

  const generateTreatments = (percentage: number, disease: string) => {
    console.log(percentage, disease);
    if (disease === "blister") {
      switch (true) {
        case percentage <= 20 && percentage > 10:
          return (
            <Text>
              බිබිලි අංගමාරයෙන් 20% ක හානියකදී, ආසාදනය සාපේක්ෂව අඩුය. කප්පාදු
              කිරීම සහ සනීපාරක්ෂක පියවරයන් ක්රියාත්මක කිරීමෙන් ඔබට ආරම්භ කළ
              හැකිය. බලපෑමට ලක් වූ කොළ සහ අතු ඉවත් කිරීම, තවදුරටත් ආසාදනය අවම
              කිරීම සඳහා නිසි ලෙස බැහැර කිරීම සහතික කිරීම. වැළැක්වීමේ පියවරක්
              ලෙස හෝ අවශ්‍ය වූ විට නිෂ්පාදක මාර්ගෝපදේශ අනුව නිර්දේශිත දිලීර නාශක
              භාවිතා කරන්න. මීට අමතරව, කාලෝචිත දිලීර නාශක යෙදීම් සඳහා කාලගුණික
              තත්ත්වයන් සහ රෝග සිදුවීම් නිරීක්ෂණය කරන්න. මෙම පියවර මෙම අදියරේදී
              රෝගය පාලනය කිරීමට උපකාරී වේ.
            </Text>
          );
        case percentage <= 40 && percentage > 20:
          return (
            <Text>
              බුබුලු අංගමාරය හානිය 40% දක්වා ළඟා වූ විට, වඩාත් ක්‍රියාශීලී පියවර
              ගැනීමට කාලයයි. බලපෑමට ලක් වූ ශාක කොටස් ඉවත් කිරීම කෙරෙහි අවධානය
              යොමු කරමින් කප්පාදු කිරීම සහ සනීපාරක්ෂාව දිගටම කරගෙන යන්න.
              නිර්දේශිත පියවරවලට අනුකූලව දිලීර නාශක යෙදීම්වල වාර ගණන වැඩි කරන්න.
              විශේෂිත දිලීර නාශක නිර්දේශ සඳහා දේශීය කෘෂිකාර්මික විශේෂඥයින් සමඟ
              සාකච්ඡා කරන්න.
            </Text>
          );
        case percentage <= 60 && percentage > 40:
          return (
            <Text>
              60% ක හානියකදී, බිබිලි අංගමාරය ආසාදනය සැලකිය යුතු කරුණක් බවට
              පත්වෙමින් තිබේ. කප්පාදු කිරීම සහ සනීපාරක්‍ෂක ප්‍රයත්නයන්, ආසාදිත
              ද්‍රව්‍ය ඉවත් කිරීම සහ බැහැර කිරීම සඳහා කඩිසර වන්න. තේ පඳුරු අතර
              නිසි පරතරයක් පවත්වා ගැනීම සහ සෙවන කළමනාකරණය තීව්‍ර කිරීම. ශාක
              සෞඛ්‍යය ප්‍රවර්ධනය කිරීම සඳහා පොහොර යෙදීම සහ වාරිමාර්ග පිළිවෙත්
              සමාලෝචනය කර සකස් කරන්න. කාලෝචිත දිලීර නාශක යෙදීම් සඳහා කාලගුණික
              තත්ත්වයන් සහ රෝග සිදුවීම් නිරීක්ෂණය කිරීම දිගටම කරගෙන යන්න.
            </Text>
          );
        case percentage <= 80 && percentage > 60:
          return (
            <Text>
              80% ක හානියක් සහිතව, තත්වය තීරනාත්මක වන අතර, ඵලදායී පියවර අවශ්ය
              වේ. දැඩි ලෙස කප්පාදු කරන්න, දැඩි ලෙස බලපෑමට ලක් වූ අතු, කඳන් සහ
              සම්පූර්ණ පඳුරු ඉවත් කරන්න. කප්පාදු කරන ලද සියලුම ද්‍රව්‍ය නිසි ලෙස
              බැහැර කරන්න. ප්‍රතිරෝධය වැලැක්වීම සඳහා දිලීර නාශක භාවිතාව සලකා
              බලමින් දිලීර නාශක යෙදීම්වල වාර ගණන දිගටම කරගෙන යන්න. විශේෂිත
              නිර්දේශ සඳහා විශේෂඥයින් සමඟ සාකච්ඡා කරන්න. දැඩි ලෙස බලපෑමට ලක් වූ
              ප්‍රදේශ හැකි නම් බිබිලි අංගමාරයට ප්‍රතිරෝධී තේ වර්ග සමඟ නැවත
              සිටුවන්න.
            </Text>
          );
        case percentage <= 100 && percentage > 80:
          return (
            <Text>
              බිබිලි අංගමාරයෙන් 100% හානියක් සිදුවුවහොත්, තේ වගාවට දැඩි ලෙස
              බලපායි. දැඩි ලෙස බලපෑමට ලක් වූ සියලුම පඳුරු සහ ද්රව්ය ඉවත් කරන්න,
              හොඳින් බැහැර කිරීම සහතික කිරීම. හානියට පත් මුළු ප්‍රදේශයම බිබිලි
              අංගමාරයට ප්‍රතිරෝධී තේ ප්‍රභේද සමඟ නැවත වගා කිරීම සලකා බලන්න. නව
              වගාව සඳහා ස්ථානය සහ පාංශු තත්ත්වය නැවත ඇගයීම. නව ගස්වල පරතරය හා
              සෙවන කළමනාකරණය වැනි වැළැක්වීමේ පියවරයන් ක්‍රියාත්මක කරන්න. නැවත
              වගා කිරීමෙන් පසුව පවා බිබිලි අංගමාරයේ යම් සලකුණු තිබේදැයි
              නිරීක්ෂණය කිරීම දිගටම කරගෙන යන්න, අනාගත ආසාදන වැලැක්වීම සඳහා
              වැළැක්වීම සහ කලින් හඳුනා ගැනීම පිළිබඳව ප්‍රජාව දැනුවත් කරන්න.
              කළමනාකරණ ක්‍රියාවලිය පුරාවට ප්‍රාදේශීය කෘෂිකාර්මික අධිකාරීන් හෝ තේ
              විශේෂඥයින් සමග සහයෝගීතාවය අත්‍යවශ්‍ය වේ.
            </Text>
          );
        default:
          return <Text>ලොකු හානියක් නෙවෙයි</Text>;
      }
    } else if (disease === "stem" || disease === "bark") {
      switch (true) {
        case percentage <= 20 && percentage > 10:
          return (
            <Text>
              කඳ සහ අතු පිළිකා වලින් 20% ක හානියකදී, ආසාදනය සාපේක්ෂව මෘදුයි.
              රෝගය පැතිරීම සීමා කිරීම සඳහා ඔබට කප්පාදු කිරීම සහ සනීපාරක්ෂාව,
              බලපෑමට ලක් වූ අතු ඉවත් කිරීම සමඟ පාලන පියවරයන් ආරම්භ කළ හැකිය.
              තවදුරටත් ආසාදනය වැලැක්වීම සඳහා කප්පාදු කරන ලද ද්රව්ය නිසි ලෙස
              බැහැර කිරීම ඉතා වැදගත් වේ. මීට අමතරව, වැළැක්වීමේ පියවරක් ලෙස හෝ
              අවශ්‍ය වූ විට අදාළ ක්ෂේත්ර නිලධාරී නිර්දේශ අනුව සුදුසු දිලීර නාශක
              යෙදීම සලකා බලන්න. නව ආසාදනවල සලකුණු සඳහා ඔබේ ගස් නිරන්තරයෙන්
              අධීක්ෂණය කිරීම මෙම අදියරේදී පාලනය පවත්වා ගැනීමට උපකාරී වේ.
            </Text>
          );
        case percentage <= 40 && percentage > 20:
          return (
            <Text>
              කඳ සහ අතු පිළිකා හානිය 40% දක්වා ළඟා වූ විට, ඔබ මදක් පරික්ශාවෙන්
              සිටිය යුතුයී. රෝගය පැතිරීම අවම කිරීම සඳහා බලපෑමට ලක් වූ කඳ හොඳින්
              ඉවත් කිරීම සහතික කරමින් කප්පාදු කිරීම සහ සනීපාරක්ෂාව දිගටම කරගෙන
              යන්න. නිර්දේශිත මාර්ගෝපදේශවලට අනුකූලව දිලීර නාශක යෙදීම්වල වාර ගණන
              වැඩි කරන්න. දිලීර නාශක සහ ඒවායේ යෙදීම පිළිබඳ විශේෂිත උපදෙස් සඳහා
              දේශීය කෘෂිකාර්මික විශේෂඥයින් සමඟ සාකච්ඡා කරන්න. නව ආසාදන ඉක්මනින්
              අල්ලා ගැනීමට සහ ක්ෂණිකව ප්‍රතිචාර දැක්වීමට සුපරීක්ෂාකාරී අධීක්ෂණය
              අත්‍යවශ්‍ය වේ.
            </Text>
          );
        case percentage <= 60 && percentage > 40:
          return (
            <Text>
              60% ක හානියකදී, කඳ අතු පිළිකා ආසාදනය සැලකිය යුතු ලෙස වැඩි වේ. දැඩි
              ලෙස බලපෑමට ලක් වූ අතු ඉවත් කිරීම කෙරෙහි විශේෂ අවධානයක් යොමු කරමින්
              කප්පාදු කිරීම සහ සනීපාරක්ෂක උත්සාහයන් දැඩි විය යුතුය. ප්‍රතිරෝධය
              වැලැක්වීම සඳහා විවිධ දිලීර නාශක අතර භ්‍රමණය සලකා බලා දිලීර නාශක
              යෙදීම් දිගටම කරගෙන ගොස් අවශ්‍ය පරිදි සකස් කළ යුතුය. රෝග කළමනාකරණයට
              අමතරව, ගස් සෞඛ්‍යයට සහ ප්‍රතිරෝධයට සහාය වීම සඳහා ඔබේ සෙවන සහ පාංශු
              කළමනාකරණ පිළිවෙත් සමාලෝචනය කර අනුගත කරන්න.
            </Text>
          );
        case percentage <= 80 && percentage > 60:
          return (
            <Text>
              80% ක හානියක් සමඟ, තත්වය බරපතල වේ. දැඩි ලෙස කප්පාදු කිරීම, දැඩි
              ලෙස බලපෑමට ලක් වූ අතු ඉවත් කිරීම සහ අවශ්ය නම් දැඩි ලෙස බලපෑමට ලක්
              වූ ගස් ඉවත් කිරීම පවා සලකා බලන්න. කප්පාදු කරන ලද සියලුම ද්‍රව්‍ය
              නිසි ලෙස බැහැර කර ඇති බවට සහතික වන්න. විශේෂිත නිර්දේශ සඳහා
              විශේෂඥයන්ගෙන් උපදෙස් ලබා ගනිමින් දිලීර නාශක යෙදීම් දිගටම කරගෙන
              යන්න. මෙම අවස්ථාවෙහිදී, දැඩි ලෙස බලපෑමට ලක් වූ ප්‍රදේශ කඳ සහ අතු
              පිළිකා වලට ප්‍රතිරෝධය සඳහා ප්‍රසිද්ධ ගස් වර්ග සමඟ නැවත වගා කිරීම
              සලකා බලන්න.
            </Text>
          );
        case percentage <= 100 && percentage > 80:
          return (
            <Text>
              කඳ අතු පිළිකා වලින් 100% හානියක් සිදු වූ විට, ආසාදනය දරුණු වන අතර
              දැඩි පියවර ගැනීම අවශ්ය වේ. දැඩි ලෙස බලපෑමට ලක් වූ සියලුම ගස් සහ
              දැව ඉවත් කරන්න, තවදුරටත් ආසාදනය වැලැක්වීම සඳහා ඒවා ප්රවේශමෙන්
              බැහැර කරන්න. පිළිකා වලට ගොදුරු වීමේ අවදානම අඩු ගස් විශේෂ සමඟ නැවත
              වගා කිරීම සලකා බලන්න. නව ගස් සඳහා දිලීර නාශක යෙදීම හෝ
              රෝග-ප්‍රතිරෝධී රෝපණ සැලැස්මක් නිර්මාණය කිරීම වැනි වැළැක්වීමේ පියවර
              ක්‍රියාත්මක කරන්න. මෙම පියවර ගැනීමෙන් පසුව පවා, පිළිකා රෝග ලක්ෂණ
              සඳහා ප්‍රදේශය නිරීක්ෂණය කිරීම දිගටම කරගෙන යන්න, අනාගත ආසාදන
              වැලැක්වීම සඳහා වැළැක්වීම සහ කලින් හඳුනා ගැනීම පිළිබඳව ප්‍රජාව
              දැනුවත් කරන්න.
            </Text>
          );
        default:
          return <Text>ලොකු හානියක් නෙවෙයි</Text>;
      }
    } else if (disease === "insect") {
      switch (percentage) {
        case 1:
          return (
            <Text>
              කඳ ගුල්ලන් විසින් ඇති කරන ලද මෙම හානි මට්ටමට මුහුණ දෙන විට, උවදුර
              මධ්‍යස්ථ දරුණු අවධියකට ළඟා වන අතර, කඩිනම් සහ ඉලක්කගත පියවර අවශ්‍ය
              වේ. ආසාදනය පැතිරීම වැළැක්වීම සඳහා බලපෑමට ලක් වූ අතු ඉවත් කිරීම
              කෙරෙහි අවධානය යොමු කරමින් කප්පාදු කිරීම සහ සනීපාරක්ෂාව සඳහා වෙහෙස
              මහන්සි වී වැඩ කළ යුතුය. ආසාදිත දැව නිසි ලෙස බැහැර කිරීම තවදුරටත්
              දූෂණය වීම වැළැක්වීම සඳහා ඉතා වැදගත් වේ. ඊට සමගාමීව, කඳ ගුල්ලන්
              මර්ධනය සඳහා සකස් කරන ලද නිර්දේශිත කෘමිනාශක යෙදීම අත්‍යවශ්‍ය වේ.
              බලපෑමට ලක් වූ ප්‍රදේශ හොඳින් ආවරණය කිරීම සහතික කිරීම සඳහා අදාළ
              ක්ෂේත්ර නිලධාරී උපදෙස් ඉතා සූක්ෂම ලෙස අනුගමනය කරන්න, ප්‍රතිකාරයේ
              කාර්යක්ෂමතාව වැඩි කරන්න. මෙම අවස්ථාවෙහිදී ගස් අඛණ්ඩව අධීක්ෂණය
              කිරීම අත්‍යවශ්‍ය වේ, මන්ද එය නව ආක්‍රමණවල සලකුණු කල්තියා හඳුනා
              ගැනීමට හැකි වේ. අවශ්‍යතාවය මත පදනම්ව කෘමිනාශක යෙදීම් සඳහා විධිමත්
              කාලසටහනක් පවත්වා ගැනීම, මෙම කඳ ගුල්ලන්න්ට එරෙහිව ඔබේ ආරක්‍ෂාව
              තවදුරටත් ශක්තිමත් කරයි, කඳ ගුල්ලන් උවදුරේ මධ්‍යස්ථ දරුණු බලපෑම අවම
              කරයි.
            </Text>
          );
        case 2:
          return (
            <Text>
              කඳ ගුල්ලන්ගේ මෙවැනි හානියකදී, ආසාදනය වඩාත් දරුණු මට්ටමකට ළඟා වේ.
              කප්පාදු කිරීම සහ සනීපාරක්ෂාව සම්බන්ධයෙන් ගත් කල, බලපෑමට ලක් වූ අතු
              ඇතුළුව ආසාදිත දැව ඉතා සූක්ෂම ලෙස හඳුනාගෙන ඉවත් කල යුතුවේ. ආසාදනය
              පැතිරීම අවම කිරීම සඳහා මෙම සම්පූර්ණ ප්රවේශය අත්යවශ්ය වේ. කෘමිනාශක
              යෙදීම් ප්‍රමාණයද වැඩි කළ යුතු අතර දේශීය පළිබෝධ කළමනාකරණ
              විශේෂඥයින්ගෙන් මඟ පෙන්වීම ලබා ගැනීම ඉතා වැදගත් වේ. ඔවුන්ගේ
              විශේෂඥතාවට විශේෂිත කෘමිනාශක නිර්දේශයන් පිළිබඳ වටිනා අවබෝධයක් ලබා
              දිය හැකි අතර, ප්‍රතිකාරයේ සඵලතාවය වැඩි කරයි. මීට අමතරව, මතුවිය
              හැකි ඕනෑම නව ආක්‍රමණයක් ඉක්මනින් හඳුනා ගැනීම සඳහා සුපරීක්ෂාකාරී
              අධීක්ෂණ පිළිවෙත් පවත්වා ගැනීම මෙම අදියරේදී ඉතා වැදගත් වේ. කඳ
              ගුල්ලන් ඵලදායී ලෙස අල්ලා ගැනීම සහ පාලනය කිරීම සඳහා ඔබේ අධීක්ෂණ
              උපාය මාර්ගයේ කොටසක් ලෙස උගුල් හෝ ෆෙරමෝන් මත පදනම් වූ ක්‍රම භාවිතා
              කිරීම සලකා බලන්න. මෙම ඒකාබද්ධ පියවරයන් කඳ ගුල්ලන් උවදුරේ වඩාත්
              දරුණු බලපෑමට එරෙහිව සටන් කිරීම සඳහා අත්‍යවශ්‍ය වේ.
            </Text>
          );
        case 5:
          return (
            <Text>
              කඳ ගුල්ලන් විශාල ප්‍රමාණයකින් හානියකට මුහුණ දෙන විට, ආසාදනයේ
              බරපතලකම පුළුල් හා තීරණාත්මක ප්‍රවේශයක් අවශ්‍ය වේ. පළමුවෙන්ම,
              ආසාදනය තවදුරටත් පැතිරීම වැළැක්වීම සඳහා දැඩි ලෙස බලපෑමට ලක් වූ
              සියලුම ගස් සහ දැව ඉවත් කිරීම හා ප්‍රතිස්ථාපනය කිරීම අත්‍යවශ්‍ය වේ.
              අනාගත ආසාදන අවදානම අවම කිරීම සඳහා කඳ ගුල්ලන් ගොදුරු විය හැකි අඩු
              ගස් විශේෂ සමඟ නැවත වගා කිරීම සලකා බලන්න. කෘමිනාශක යෙදීම හෝ භෞතික
              බාධක සවි කිරීම වැනි නව ගස් සඳහා වැළැක්වීමේ ක්‍රියාමාර්ග
              ක්‍රියාත්මක කිරීම, අලුතින් සිටුවන ලද ගස්වලට මෙම කඳ ගුල්ලන්
              ඇතුලුවීම වැලැක්වීම අත්‍යවශ්‍ය වේ. කඳ ගුල්ලන් උවදුර කළමනාකරණය
              කිරීමේදී පළපුරුදු හා පළිබෝධ පාලන විශේෂඥයින්ගෙන් වෘත්තීය සහය ලබා
              ගැනීම පුලුල් අවබෝධයක් සහ සහායක් ලබා ගත හැක. දැඩි ක්‍රියාමාර්ග
              ගැනීමෙන් පසුව පවා, ප්‍රදේශය අඛණ්ඩව අධීක්ෂණය කිරීම, ආසාදනයේ ඕනෑම
              වෙනසක් ක්ෂණිකව විසඳීමට වැදගත් වේ. තවද, අනාගත ආසාදනවලට සාමූහිකව
              එරෙහිව සටන් කිරීම සඳහා වැළැක්වීම සහ කලින් හඳුනා ගැනීම පිළිබඳ
              ප්‍රජාව තුළ අධ්‍යාපනය අත්‍යවශ්‍ය වේ.
            </Text>
          );
        default:
          return <Text>ලොකු හානියක් නෙවෙයි</Text>;
      }
    }
  };
  return (
    <View style={mainStyles.main}>
      <Text
        style={{
          color: COLOR_PALETTE.secondary,
          backgroundColor: COLOR_PALETTE.primary,
          fontSize: 24,
          paddingBottom: 32,
          paddingTop: 12,
          borderRadius: 12,
          textAlign: "center",
          marginTop: 24,
        }}
      >
        {route.params.scanType === "blister"
          ? "Blister Blight"
          : route.params.scanType === "stem"
          ? "Stem Canker"
          : route.params.scanType === "insect"
          ? "Insect Detected"
          : "Branch Canker"}
      </Text>
      <Text
        style={{
          color: COLOR_PALETTE.secondary,
          backgroundColor: COLOR_PALETTE.primary,
          fontSize: 16,
          padding: 12,
          borderRadius: 12,
          textAlign: "center",
          borderColor: COLOR_PALETTE.secondary,
          borderWidth: 2,
          marginBottom: 12,
          marginHorizontal: 32,
          marginTop: -24,
        }}
      >
        {/* Change This According to your need */}
        Damage Ratio: {Number(route.params.percentage)}
      </Text>
      <View style={{marginTop: 32}}>
        {route.params &&
          generateTreatments(
            Number(route.params.percentage),
            route.params.scanType
          )}
      </View>
    </View>
  );
};

export default Treatments;
