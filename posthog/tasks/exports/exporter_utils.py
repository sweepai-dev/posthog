from datetime import datetime
from typing import Optional

import requests
import structlog

from posthog import settings

logger = structlog.get_logger(__name__)


_site_reachable = None
_site_reachable_checked_at: Optional[datetime] = None


def is_site_url_reachable() -> bool:
    """
    Attempt to GET the SITE_ URL and log an error if it's not reachable
    or if the HTTP status code indicates an error
    """

    global _site_reachable
    global _site_reachable_checked_at

    if not settings.SITE_URL:
        return False

    if _site_reachable_checked_at and _site_reachable_checked_at > datetime.now() - datetime.timedelta(minutes=1):
        _site_reachable_checked_at = None

    if _site_reachable_checked_at is None:
        _site_reachable_checked_at = datetime.now()

        try:
            response = requests.get(settings.SITE_URL, timeout=5)
            _site_reachable = response.status_code < 400
        except Exception:
            _site_reachable = False

    return _site_reachable


def log_error_if_site_url_not_reachable() -> None:
    if not settings.SITE_URL:
        logger.error("site_url_not_set")
    elif not is_site_url_reachable():
        logger.error("site_url_not_reachable", site_url=settings.SITE_URL)
