#!/usr/bin/env python3
"""
HKSchoolPlace — KGP 幼稚园数据爬虫
从 kgp2025.azurewebsites.net 获取所有 18 区幼稚园列表和详细信息
"""

import json
import re
import sys
import time
import urllib.request
from html.parser import HTMLParser

BASE_URL = "https://kgp2025.azurewebsites.net/edb"

# KGP district slug → our district code mapping
DISTRICTS = {
    "central": "central_and_western",
    "hkeast": "eastern",
    "southern": "southern",
    "wanchai": "wan_chai",
    "kowlooncity": "kowloon_city",
    "kwuntong": "kwun_tong",
    "shamshuipo": "sham_shui_po",
    "wongtaisin": "wong_tai_sin",
    "yautsimmongkok": "yau_tsim_mong",
    "islands": "islands",
    "kwaichung": "kwai_tsing",
    "north": "north",
    "saikung": "sai_kung",
    "shatin": "sha_tin",
    "taipo": "tai_po",
    "tsuenwan": "tsuen_wan",
    "tuenmun": "tuen_mun",
    "yuenlong": "yuen_long",
}


class SchoolListParser(HTMLParser):
    """Parse district school list page to extract school links and names."""

    def __init__(self):
        super().__init__()
        self.schools = []
        self.in_link = False
        self.current_href = ""
        self.current_text = ""

    def handle_starttag(self, tag, attrs):
        if tag == "a":
            attrs_dict = dict(attrs)
            href = attrs_dict.get("href", "")
            if "schoolinfo.php" in href:
                self.in_link = True
                self.current_href = href
                self.current_text = ""

    def handle_data(self, data):
        if self.in_link:
            self.current_text += data.strip()

    def handle_endtag(self, tag):
        if tag == "a" and self.in_link:
            self.in_link = False
            if self.current_text:
                self.schools.append({
                    "href": self.current_href,
                    "name": self.current_text,
                })


class SchoolDetailParser(HTMLParser):
    """Parse school detail page to extract structured data."""

    def __init__(self):
        super().__init__()
        self.data = {}
        self.capture = False
        self.current_field = ""
        self.current_text = ""
        self.all_text = []
        self.in_td = False
        self.td_texts = []

    def handle_starttag(self, tag, attrs):
        if tag == "td":
            self.in_td = True
            self.current_text = ""

    def handle_data(self, data):
        if self.in_td:
            self.current_text += data
        self.all_text.append(data)

    def handle_endtag(self, tag):
        if tag == "td" and self.in_td:
            self.in_td = False
            self.td_texts.append(self.current_text.strip())


def fetch_url(url, retries=3):
    """Fetch URL with retries."""
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
                "Accept": "text/html,application/xhtml+xml",
                "Accept-Language": "zh-TW,zh;q=0.9,en;q=0.8",
            })
            with urllib.request.urlopen(req, timeout=30) as resp:
                return resp.read().decode("utf-8", errors="replace")
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(2)
            else:
                print(f"  Failed to fetch {url}: {e}", file=sys.stderr)
                return None


def parse_school_detail(html, district_code):
    """Extract school info from detail page."""
    school = {
        "district": district_code,
        "data_source": "edb",
    }

    full_text = html

    # Extract school name (Chinese) - usually in the title or first heading
    name_match = re.search(r'<span[^>]*class="[^"]*font_content_heading[^"]*"[^>]*>(.*?)</span>', html, re.DOTALL)
    if name_match:
        school["name_tc"] = re.sub(r'<[^>]+>', '', name_match.group(1)).strip()

    # Try to get from title
    title_match = re.search(r'<title>(.*?)</title>', html)
    if title_match and not school.get("name_tc"):
        school["name_tc"] = title_match.group(1).strip()

    # Parse table data - look for label: value patterns
    td_parser = SchoolDetailParser()
    try:
        td_parser.feed(html)
    except:
        pass

    tds = td_parser.td_texts
    full_joined = "\n".join(td_parser.all_text)

    # Find key fields by scanning td pairs
    for i, td in enumerate(tds):
        td_clean = td.strip().replace("\xa0", "").replace("\r\n", "")

        if "學校名稱" in td_clean or "校名" in td_clean:
            if i + 1 < len(tds) and tds[i+1].strip():
                school["name_tc"] = tds[i+1].strip()

        if "School Name" in td_clean or "Name of School" in td_clean:
            if i + 1 < len(tds) and tds[i+1].strip():
                school["name_en"] = tds[i+1].strip()

        if "地址" in td_clean and "Address" not in td_clean and "電郵" not in td_clean:
            if i + 1 < len(tds) and tds[i+1].strip():
                school["address_tc"] = tds[i+1].strip()

        if "Address" in td_clean and "地址" not in td_clean:
            if i + 1 < len(tds) and tds[i+1].strip():
                school["address_en"] = tds[i+1].strip()

        if "電話" in td_clean:
            if i + 1 < len(tds) and tds[i+1].strip():
                phone = re.sub(r'[^\d]', '', tds[i+1].strip())
                if len(phone) >= 8:
                    school["phone"] = phone[:8]

        if "傳真" in td_clean:
            if i + 1 < len(tds) and tds[i+1].strip():
                fax = re.sub(r'[^\d]', '', tds[i+1].strip())
                if len(fax) >= 8:
                    school["fax"] = fax[:8]

        if "電郵" in td_clean or "Email" in td_clean:
            if i + 1 < len(tds):
                email = tds[i+1].strip()
                if "@" in email:
                    school["email"] = email

        if "學校類別" in td_clean or "Type" in td_clean:
            if i + 1 < len(tds):
                stype = tds[i+1].strip()
                if "非牟利" in stype:
                    school["school_type"] = "non_profit"
                elif "私立" in stype or "獨立" in stype:
                    school["school_type"] = "private_independent"
                else:
                    school["school_type"] = "non_profit"  # default

        if "學生類別" in td_clean or "授課時間" in td_clean:
            if i + 1 < len(tds):
                session = tds[i+1].strip()
                if "全日" in session and "半日" in session:
                    school["session_type"] = "am_pm_whole_day"
                elif "全日" in session:
                    school["session_type"] = "whole_day"
                elif "上午" in session and "下午" in session:
                    school["session_type"] = "am_pm"
                elif "上午" in session:
                    school["session_type"] = "am"
                elif "下午" in session:
                    school["session_type"] = "pm"

    # Extract school website
    web_match = re.search(r'href="(https?://[^"]+)"[^>]*class="[^"]*websiteurl', html)
    if web_match:
        school["website"] = web_match.group(1)
    else:
        web_match2 = re.search(r'網址.*?href="(https?://[^"]+)"', html, re.DOTALL)
        if web_match2:
            school["website"] = web_match2.group(1)

    # Check if KEP participant (幼稚園教育計劃)
    if "參加幼稚園教育計劃" in full_joined or "有參加" in full_joined:
        school["kep_participant"] = True
    else:
        school["kep_participant"] = False

    # Extract school code from URL if possible
    code_match = re.search(r'schoolcode=(\d+)', html)
    if code_match:
        school["school_code"] = code_match.group(1)

    # Default values
    school.setdefault("school_type", "non_profit")
    school.setdefault("name_tc", "")
    school.setdefault("kep_participant", False)
    school.setdefault("is_active", True)
    school.setdefault("grades_offered", ["N", "K1", "K2", "K3"])

    return school


def main():
    all_schools = []

    for kgp_district, our_district in DISTRICTS.items():
        print(f"\n=== Fetching district: {kgp_district} ({our_district}) ===", file=sys.stderr)

        # Fetch district school list
        list_url = f"{BASE_URL}/school.php?district={kgp_district}"
        html = fetch_url(list_url)
        if not html:
            continue

        # Parse school links
        parser = SchoolListParser()
        parser.feed(html)

        print(f"  Found {len(parser.schools)} schools", file=sys.stderr)

        for idx, school_link in enumerate(parser.schools):
            href = school_link["href"]
            if not href.startswith("http"):
                detail_url = f"{BASE_URL}/{href}"
            else:
                detail_url = href

            print(f"  [{idx+1}/{len(parser.schools)}] {school_link['name'][:30]}...", file=sys.stderr)

            detail_html = fetch_url(detail_url)
            if not detail_html:
                # At minimum, save the school name and district
                all_schools.append({
                    "name_tc": school_link["name"],
                    "district": our_district,
                    "school_type": "non_profit",
                    "data_source": "edb",
                    "is_active": True,
                    "kep_participant": False,
                    "grades_offered": ["N", "K1", "K2", "K3"],
                })
                continue

            school_data = parse_school_detail(detail_html, our_district)

            # Override name from list page if detail page didn't find it
            if not school_data.get("name_tc") or school_data["name_tc"] == "":
                school_data["name_tc"] = school_link["name"]

            # Extract school code from href
            code_match = re.search(r'schoolno=(\d+)', href)
            if code_match:
                school_data["school_code"] = code_match.group(1)

            all_schools.append(school_data)

            # Be respectful
            time.sleep(0.3)

    # Output as JSON
    print(json.dumps(all_schools, ensure_ascii=False, indent=2))
    print(f"\n\nTotal schools: {len(all_schools)}", file=sys.stderr)


if __name__ == "__main__":
    main()
