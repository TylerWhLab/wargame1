package KimJeongKyun.wargame.Router;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface NoticeDao {
    Map selectUser(Map req);
    int insertFileInfo(Map req);
    int updateFileInfo(Map req);
    int insertNotice(Map req);
    int updateNotice(Map req);
    List<Map<String, Object>> selectNotices(Map req);
    int selectNoticeTotal(Map req);
//    Map selectNotice(Map req);
}
