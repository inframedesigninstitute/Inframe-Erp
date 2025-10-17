import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { LeaveApplication } from '../screens/LeaveApplication';

type ViewModalProps = {
    isVisible: boolean;
    onClose: () => void;
    leaveData: LeaveApplication;
};

const StatusBadge: React.FC<{ status: LeaveApplication['status'] }> = ({ status }) => {
    let bg = '#fff3cd', color = '#856404';
    if(status==='Approved'){ bg='#d4edda'; color='#155724'; }
    else if(status==='Rejected'){ bg='#f8d7da'; color='#721c24'; }
    return (
        <View style={{ paddingVertical:3, paddingHorizontal:6, borderRadius:15, backgroundColor:bg }}>
            <Text style={{ fontSize:12, fontWeight:'600', color }}>{status}</Text>
        </View>
    );
};

const ViewLeaveModal: React.FC<ViewModalProps> = ({ isVisible, onClose, leaveData }) => {
    const [startDate, endDate] = leaveData.leaveDates ? leaveData.leaveDates.split(' - ') : ['', ''];
    return (
        <Modal animationType="fade" transparent visible={isVisible} onRequestClose={onClose}>
            <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0,0,0,0.5)' }}>
                <View style={{ backgroundColor:'white', padding:20, borderRadius:8, width:'80%', maxWidth:450 }}>
                    <View style={{ flexDirection:'row', justifyContent:'space-between', marginBottom:15 }}>
                        <Text style={{ fontSize:18, fontWeight:'bold' }}>View Apply Leave</Text>
                        <TouchableOpacity onPress={onClose}><Ionicons name="close" size={24} color="#adb5bd" /></TouchableOpacity>
                    </View>

                    <Text style={{ fontWeight:'bold', fontSize:16, marginBottom:15 }}>Name: {leaveData.name||'N/A'}</Text>

                    <View style={{ flexDirection:'row', justifyContent:'space-between', marginBottom:10 }}>
                        <View><Text>Start Date:</Text><Text>{startDate}</Text></View>
                        <View><Text>Review By:</Text><Text>Super Admin</Text></View>
                    </View>

                    <View style={{ flexDirection:'row', justifyContent:'space-between', marginBottom:10 }}>
                        <View><Text>End Date:</Text><Text>{endDate}</Text></View>
                        <View><Text>Apply Date:</Text><Text>{leaveData.applyDate}</Text></View>
                    </View>

                    <View style={{ flexDirection:'row', justifyContent:'space-between', marginBottom:10 }}>
                        <View><Text>Days:</Text><Text>{leaveData.days}</Text></View>
                        <View><Text>Status:</Text><StatusBadge status={leaveData.status} /></View>
                    </View>

                    <Text style={{ marginTop:15 }}>Subject:</Text>
                    <Text>{leaveData.subject}</Text>

                    <Text style={{ marginTop:10 }}>Reason:</Text>
                    <Text>{leaveData.reason || "No Reason Provided"}</Text>

                    <TouchableOpacity onPress={onClose} style={{ backgroundColor:'#adb5bd', padding:10, borderRadius:4, marginTop:20, alignSelf:'flex-end' }}>
                        <Text style={{ color:'#fff', fontWeight:'bold' }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default ViewLeaveModal;
